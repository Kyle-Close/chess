import { useAppDispatch } from "base/features/game-board/hooks/useBoard";
import { resetGameInfo, setEnPassantSquare, setFullMoves, setHalfMoves, setIsPlaying, setPlayerIds } from "base/redux/slices/gameInfo";
import { createTimer, removeAllTimers, setIsOn, setRemainingSeconds } from "base/redux/slices/timer";
import { getStartingTimeInSeconds } from "base/utils/getStartingTimeInSeconds";
import { createCastleRights } from "base/redux/slices/castleRights";
import { BoardState } from "base/data/getInitialBoardState";
import { PieceColor } from "base/features/game-board/hooks/usePiece";
import { createPlayer, setIsTurn } from "base/redux/slices/player";
import { isValidFEN, parseFenString } from "base/features/game-logic/utils/fen/parseFenString";
import { buildBoardFromFen } from "base/features/game-logic/utils/fen/buildBoardFromFen";
import { getEnPassantTargetSquareFromFen } from "base/features/game-logic/utils/fen/getEnPassantTargetSquareFromFen";
import { DEFAULT_FEN_STRING } from "base/data/defaultFen";
import { setupBoard } from "base/redux/slices/board";
import { GameType, setGameType, setIsFiftyMoveRule, setIsIncrement, setIsUndoRedo, setStockfishElo, setTimeControl } from "base/redux/slices/gameSettings";
import { useNavigate } from "react-router-dom";
import { useGetGameState } from "./useGetGameState";
import { buildSettingsObject } from "../util/buildSettingsObject";
import { GameSetup } from "./useGameSettings";

export function useSetupForLocalGame() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const gameState = useGetGameState()

  function setupLocalGame(localFormData: GameSetup) {
    // Clear previous settings
    dispatch(resetGameInfo({ resetIds: true }));
    dispatch(removeAllTimers());

    console.log(localFormData)
    const settings = buildSettingsObject(GameType.LOCAL, localFormData);

    // Set timers up
    const whiteTimer = dispatch(createTimer(getStartingTimeInSeconds(settings.timeControl)));
    const blackTimer = dispatch(createTimer(getStartingTimeInSeconds(settings.timeControl)));

    // Set castle rights up
    const whiteCastleRights = dispatch(createCastleRights());
    const blackCastleRights = dispatch(createCastleRights());

    let board: BoardState = [];

    if (!localFormData.whiteName)
      throw new Error('White name is mandatory')

    if (!localFormData.blackName)
      throw new Error('Black name is mandatory')

    // Set players up
    const whitePlayer = dispatch(
      createPlayer({
        name: localFormData.whiteName,
        color: PieceColor.WHITE,
        isInCheck: false,
        isTurn: false,
        timerId: whiteTimer.payload.id,
        castleRightsId: whiteCastleRights.payload.id,
        remainingMaterialValue: 39,
        isAi: false
      })
    );

    const blackPlayer = dispatch(
      createPlayer({
        name: localFormData.blackName,
        color: PieceColor.BLACK,
        isInCheck: false,
        isTurn: false,
        timerId: blackTimer.payload.id,
        castleRightsId: blackCastleRights.payload.id,
        remainingMaterialValue: 39,
        isAi: false,
      })
    );

    let playerTurn = whitePlayer;

    // Set the board up
    if (localFormData.fen && isValidFEN(localFormData.fen)) {
      const fenObj = parseFenString(localFormData.fen);
      board = buildBoardFromFen(fenObj.initialPositions);
      playerTurn = fenObj.turn === 'w' ? whitePlayer : blackPlayer;
      dispatch(setHalfMoves(Number(fenObj.halfMoves)));
      dispatch(setFullMoves(Number(fenObj.fullMoves)));
      dispatch(setEnPassantSquare(getEnPassantTargetSquareFromFen(fenObj.enPassant)));
    } else {
      const fen = parseFenString(DEFAULT_FEN_STRING);
      board = buildBoardFromFen(fen.initialPositions);
    }

    dispatch(setupBoard(board));

    const newCastleRights = gameState.castleRights.getNewCastleRights(board);
    gameState.castleRights.updateCastleRights(
      newCastleRights,
      whitePlayer.payload.castleRightsId,
      blackPlayer.payload.castleRightsId
    );

    dispatch(
      setPlayerIds({ whitePlayerId: whitePlayer.payload.id, blackPlayerId: blackPlayer.payload.id })
    );

    // Set timers up
    const remainingSeconds = getStartingTimeInSeconds(settings.timeControl);
    dispatch(setRemainingSeconds({ id: whiteTimer.payload.id, remainingSeconds }));
    dispatch(setRemainingSeconds({ id: blackTimer.payload.id, remainingSeconds }));
    dispatch(setIsOn({ id: whiteTimer.payload.id, isOn: true }));

    // Set starting player turn
    dispatch(setIsTurn({ id: playerTurn.payload.id, isTurn: true }));

    // Start game
    dispatch(setIsPlaying(true));

    // Handle game settings
    dispatch(setGameType(settings.gameType));
    dispatch(setTimeControl(settings.timeControl));
    dispatch(setIsFiftyMoveRule(settings.isFiftyMoveRule));
    dispatch(setIsIncrement(settings.isIncrement));
    dispatch(setIsUndoRedo(settings.isUndoRedo));
    dispatch(setStockfishElo(0))

    navigate('/game');
  }

  return { setupLocalGame }
}

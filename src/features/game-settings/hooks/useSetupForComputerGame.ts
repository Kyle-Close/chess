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
import { GameType, TimeControl, setGameType, setIsFiftyMoveRule, setIsIncrement, setIsUndoRedo, setStockfishElo, setTimeControl } from "base/redux/slices/gameSettings";
import { socket } from "base/utils/socket";
import { useNavigate } from "react-router-dom";
import { useGetGameState } from "./useGetGameState";
import { buildSettingsObject } from "../util/buildSettingsObject";
import { GameSetup } from "./useGameSettings";
import { useMove } from "base/features/game-logic/hooks/useMove";

export function useSetupForComputerGame() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const move = useMove()
  const gameState = useGetGameState()

  function setupComputerGame(computerFormData: GameSetup) {
    console.log(computerFormData)
    // Clear previous settings
    dispatch(resetGameInfo({ resetIds: true }));
    dispatch(removeAllTimers());

    const settings = buildSettingsObject(GameType.COMPUTER, computerFormData);

    // Set timers up
    const whiteTimer = dispatch(createTimer(getStartingTimeInSeconds(TimeControl.FREE_PLAY)));
    const blackTimer = dispatch(createTimer(getStartingTimeInSeconds(TimeControl.FREE_PLAY)));

    // Set castle rights up
    const whiteCastleRights = dispatch(createCastleRights());
    const blackCastleRights = dispatch(createCastleRights());

    let board: BoardState = [];

    // Set players up
    const whitePlayer = dispatch(
      createPlayer({
        name: "",
        color: PieceColor.WHITE,
        isInCheck: false,
        isTurn: false,
        timerId: whiteTimer.payload.id,
        castleRightsId: whiteCastleRights.payload.id,
        remainingMaterialValue: 39,
        isAi: computerFormData.isWhite ? false : true
      })
    );

    const blackPlayer = dispatch(
      createPlayer({
        name: "",
        color: PieceColor.BLACK,
        isInCheck: false,
        isTurn: false,
        timerId: blackTimer.payload.id,
        castleRightsId: blackCastleRights.payload.id,
        remainingMaterialValue: 39,
        isAi: computerFormData.isWhite ? true : false
      })
    );

    let playerTurn = whitePlayer;

    // Set the board up
    if (computerFormData.fen && isValidFEN(computerFormData.fen)) {
      const fenObj = parseFenString(computerFormData.fen);
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
    dispatch(setRemainingSeconds({ id: whiteTimer.payload.id, remainingSeconds: 999999 }));
    dispatch(setRemainingSeconds({ id: blackTimer.payload.id, remainingSeconds: 999999 }));
    dispatch(setIsOn({ id: whiteTimer.payload.id, isOn: true }));

    // Set starting player turn
    dispatch(setIsTurn({ id: playerTurn.payload.id, isTurn: true }));

    // Start game
    dispatch(setIsPlaying(true));

    // Handle game settings
    dispatch(setGameType(settings.gameType));
    dispatch(setTimeControl(TimeControl.FREE_PLAY));
    dispatch(setIsFiftyMoveRule(settings.isFiftyMoveRule));
    dispatch(setIsIncrement(settings.isIncrement));
    dispatch(setIsUndoRedo(settings.isUndoRedo));
    dispatch(setStockfishElo(settings.stockfishElo))

    const gameSocket = socket.connect()

    gameSocket.on('bestmove', (data) => {
      console.log(data)
      move.executeAiMove(data)
    })

    gameSocket.emit('set-difficulty', computerFormData.stockfishElo)

    navigate('/game');
  }

  return { setupComputerGame }
}

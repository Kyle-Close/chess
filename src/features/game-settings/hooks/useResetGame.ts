import { useAppDispatch } from "base/features/game-board/hooks/useBoard";
import { buildBoardFromFen } from "base/features/game-logic/utils/fen/buildBoardFromFen";
import { parseFenString } from "base/features/game-logic/utils/fen/parseFenString";
import { setupBoard } from "base/redux/slices/board";
import { setCastleRights } from "base/redux/slices/castleRights";
import { resetGameInfo, setIsPlaying } from "base/redux/slices/gameInfo";
import { setIsInCheck, setIsTurn, setRemainingMaterialValue } from "base/redux/slices/player";
import { setIsOn, setRemainingSeconds } from "base/redux/slices/timer";
import { getStartingTimeInSeconds } from "base/utils/getStartingTimeInSeconds";
import { useNavigate } from "react-router-dom";
import { initialCastleRights } from "base/features/game-logic/hooks/useCastleRights";
import { DEFAULT_FEN_STRING } from "base/data/defaultFen";
import { useGetGameState } from "./useGetGameState";

export function useResetGame() {
  function reset() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const gameState = useGetGameState()

    // Clear previous gameInfo (except the player ids)
    dispatch(resetGameInfo({ resetIds: false }));

    // Reset player isInCheck & isTurn
    dispatch(setIsInCheck({ id: gameState.whitePlayer.id, isInCheck: false }));
    dispatch(setIsTurn({ id: gameState.whitePlayer.id, isTurn: false }));
    dispatch(setIsInCheck({ id: gameState.blackPlayer.id, isInCheck: false }));
    dispatch(setIsTurn({ id: gameState.blackPlayer.id, isTurn: false }));
    dispatch(setRemainingMaterialValue({ id: gameState.whitePlayer.id, value: 39 }));
    dispatch(setRemainingMaterialValue({ id: gameState.blackPlayer.id, value: 39 }));

    // Setup default game board
    const fen = parseFenString(DEFAULT_FEN_STRING);
    dispatch(setupBoard(buildBoardFromFen(fen.initialPositions)));

    // Set timers up
    const remainingSeconds = getStartingTimeInSeconds(gameState.gameSettings.timeControl);
    dispatch(setRemainingSeconds({ id: gameState.whitePlayer.timerId, remainingSeconds }));
    dispatch(setRemainingSeconds({ id: gameState.blackPlayer.timerId, remainingSeconds }));
    dispatch(setIsOn({ id: gameState.whitePlayer.timerId, isOn: true }));
    dispatch(setIsOn({ id: gameState.blackPlayer.timerId, isOn: false }));

    // TODO: Clear the previous castle right id's

    // Reset castle rights
    dispatch(
      setCastleRights({ castleRights: { ...initialCastleRights, id: gameState.whitePlayer.castleRightsId } })
    );
    dispatch(
      setCastleRights({ castleRights: { ...initialCastleRights, id: gameState.blackPlayer.castleRightsId } })
    );

    // Start game
    dispatch(setIsTurn({ id: gameState.whitePlayer.id, isTurn: true }));
    dispatch(setIsTurn({ id: gameState.blackPlayer.id, isTurn: false }));

    dispatch(setIsPlaying(true));

    navigate('/game');
  }
  return { reset }
}

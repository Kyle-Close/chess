import { SubmitHandler, useForm } from 'react-hook-form';
import {
  GameSettings,
  GameType,
  TimeControl,
  setGameType,
  setIsFiftyMoveRule,
  setIsIncrement,
  setIsUndoRedo,
  setTimeControl,
} from '../redux/slices/gameSettings';
import { useAppDispatch, useAppSelector } from './useBoard';
import { resetGameInfo, setIsPlaying, setPlayerIds } from '../redux/slices/gameInfo';
import {
  createPlayer,
  removeAllPlayers,
  selectPlayerById,
  setIsInCheck,
  setIsTurn,
} from '../redux/slices/player';
import {
  createCastleRights,
  removeAllCastleRights,
  setCastleRights,
} from '../redux/slices/castleRights';
import { createTimer, removeAllTimers, setIsOn, setRemainingSeconds } from '../redux/slices/timer';
import { getStartingTimeInSeconds } from '../helpers/notation-setup/game-setup/getStartingTimeInSeconds';
import { isValidFEN, parseFenString } from '../helpers/notation-setup/game-setup/parseFenString';
import { setupBoard } from '../redux/slices/board';
import { buildBoardFromFen } from '../helpers/notation-setup/game-setup/buildBoardFromFen';
import { PieceColor } from '../enums/PieceColor';
import { DEFAULT_FEN_STRING } from '../constants/defaultFen';
import { useNavigate } from 'react-router-dom';
import { initialCastleRights, useCastleRights } from './useCastleRights';
import { BoardState } from '../context/board/InitialState';

export type LocalGameSetupFormInputs = {
  whiteName: string;
  blackName: string;
  selectedTimeControl: TimeControl;
  isIncrement: boolean;
  isUndoRedo: boolean;
  isFiftyMoveRule: boolean;
  fen: string;
};

export function useGameSettings() {
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const gameSettings = useAppSelector((state) => state.gameSettings);
  const whitePlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.whitePlayerId));
  const blackPlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.blackPlayerId));
  const castleRights = useCastleRights();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LocalGameSetupFormInputs>();
  const onLocalFormSubmit: SubmitHandler<LocalGameSetupFormInputs> = (data) =>
    setupSettingsFromLocalForm(data);

  function setupSettingsFromLocalForm(data: LocalGameSetupFormInputs) {
    // Clear previous settings
    dispatch(resetGameInfo({ resetIds: true }));

    // Remove any previous entities
    dispatch(removeAllPlayers());
    dispatch(removeAllCastleRights());
    dispatch(removeAllTimers());

    const settings = buildSettingsObject(data);
    const whiteTimer = dispatch(createTimer(getStartingTimeInSeconds(settings.timeControl)));
    const blackTimer = dispatch(createTimer(getStartingTimeInSeconds(settings.timeControl)));
    const whiteCastleRightsRedux = dispatch(createCastleRights());
    const blackCastleRightsRedux = dispatch(createCastleRights());

    let board: BoardState = [];

    if (isValidFEN(data.fen)) {
      const fen = parseFenString(data.fen);
      board = buildBoardFromFen(fen.initialPositions);
    } else {
      const fen = parseFenString(DEFAULT_FEN_STRING);
      board = buildBoardFromFen(fen.initialPositions);
    }

    dispatch(setupBoard(board));

    const whitePlayer = dispatch(
      createPlayer({
        name: data.whiteName,
        color: PieceColor.WHITE,
        isInCheck: false,
        isTurn: false,
        timerId: whiteTimer.payload.id,
        castleRightsId: whiteCastleRightsRedux.payload.id,
      })
    );

    const blackPlayer = dispatch(
      createPlayer({
        name: data.blackName,
        color: PieceColor.BLACK,
        isInCheck: false,
        isTurn: false,
        timerId: blackTimer.payload.id,
        castleRightsId: blackCastleRightsRedux.payload.id,
      })
    );

    castleRights.updateCastleRights(board, PieceColor.WHITE, whitePlayer.payload.castleRightsId);
    castleRights.updateCastleRights(board, PieceColor.BLACK, blackPlayer.payload.castleRightsId);

    dispatch(
      setPlayerIds({ whitePlayerId: whitePlayer.payload.id, blackPlayerId: blackPlayer.payload.id })
    );

    // Set timers up
    const remainingSeconds = getStartingTimeInSeconds(settings.timeControl);
    dispatch(setRemainingSeconds({ id: whiteTimer.payload.id, remainingSeconds }));
    dispatch(setRemainingSeconds({ id: blackTimer.payload.id, remainingSeconds }));
    dispatch(setIsOn({ id: whiteTimer.payload.id, isOn: true }));

    // Start game
    dispatch(setIsPlaying(true));
    dispatch(setIsTurn({ id: whitePlayer.payload.id, isTurn: true }));

    // Handle game settings
    dispatch(setGameType(settings.gameType));
    dispatch(setTimeControl(settings.timeControl));
    dispatch(setIsFiftyMoveRule(settings.isFiftyMoveRule));
    dispatch(setIsIncrement(settings.isIncrement));
    dispatch(setIsUndoRedo(settings.isUndoRedo));

    navigate('/game');
  }

  function resetGame() {
    // Clear previous gameInfo (except the player ids)
    dispatch(resetGameInfo({ resetIds: false }));

    // Reset player isInCheck & isTurn
    dispatch(setIsInCheck({ id: whitePlayer.id, isInCheck: false }));
    dispatch(setIsTurn({ id: whitePlayer.id, isTurn: false }));
    dispatch(setIsInCheck({ id: blackPlayer.id, isInCheck: false }));
    dispatch(setIsTurn({ id: blackPlayer.id, isTurn: false }));

    // Setup default game board
    const fen = parseFenString(DEFAULT_FEN_STRING);
    dispatch(setupBoard(buildBoardFromFen(fen.initialPositions)));

    // Set timers up
    const remainingSeconds = getStartingTimeInSeconds(gameSettings.timeControl);
    dispatch(setRemainingSeconds({ id: whitePlayer.timerId, remainingSeconds }));
    dispatch(setRemainingSeconds({ id: blackPlayer.timerId, remainingSeconds }));
    dispatch(setIsOn({ id: whitePlayer.timerId, isOn: true }));
    dispatch(setIsOn({ id: blackPlayer.timerId, isOn: false }));

    // Reset castle rights
    dispatch(
      setCastleRights({ castleRights: { ...initialCastleRights, id: whitePlayer.castleRightsId } })
    );
    dispatch(
      setCastleRights({ castleRights: { ...initialCastleRights, id: blackPlayer.castleRightsId } })
    );

    // Start game
    dispatch(setIsPlaying(true));
    dispatch(setIsTurn({ id: whitePlayer.id, isTurn: true }));

    navigate('/game');
  }

  function buildSettingsObject(data: LocalGameSetupFormInputs): GameSettings {
    return {
      gameType: GameType.LOCAL,
      timeControl: data.selectedTimeControl,
      isIncrement: data.isIncrement,
      isUndoRedo: data.isUndoRedo,
      isFiftyMoveRule: data.isFiftyMoveRule,
    };
  }

  return {
    onLocalFormSubmit,
    setupSettingsFromLocalForm,
    register,
    handleSubmit,
    resetGame,
  };
}

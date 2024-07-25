import { useForm, SubmitHandler } from 'react-hook-form';
import { DEFAULT_FEN_STRING } from '../constants/defaultFen';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createTimer, setIsOn, setRemainingSeconds } from '../redux/slices/timer';
import { getStartingTimeInSeconds } from '../helpers/notation-setup/game-setup/getStartingTimeInSeconds';
import { createPlayer, setIsTurn } from '../redux/slices/player';
import { PieceColor } from '../enums/PieceColor';
import { setPlayerIds, toggleIsPlaying } from '../redux/slices/gameInfo';
import { setupBoard } from '../redux/slices/board';
import { buildBoardFromFen } from '../helpers/notation-setup/game-setup/buildBoardFromFen';
import { createCastleRights } from '../redux/slices/castleRights';
import { parseFenString } from '../helpers/notation-setup/game-setup/parseFenString';
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

export type LocalGameSetupFormInputs = {
  whiteName: string;
  blackName: string;
  selectedTimeControl: TimeControl;
  isIncrement: boolean;
  isUndoRedo: boolean;
  isFiftyMoveRule: boolean;
};

export function useLocalGameSetup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LocalGameSetupFormInputs>();
  const onSubmit: SubmitHandler<LocalGameSetupFormInputs> = (data) => setupGame(data);

  const setupGame = (data: LocalGameSetupFormInputs) => {
    const settings = buildSettingsObject(data);
    const whiteTimer = dispatch(createTimer(getStartingTimeInSeconds(settings.timeControl)));
    const blackTimer = dispatch(createTimer(getStartingTimeInSeconds(settings.timeControl)));
    const whiteCastleRights = dispatch(createCastleRights());
    const blackCastleRights = dispatch(createCastleRights());

    const fen = parseFenString(DEFAULT_FEN_STRING);
    dispatch(setupBoard(buildBoardFromFen(fen.initialPositions)));

    const whitePlayer = dispatch(
      createPlayer({
        name: data.whiteName,
        color: PieceColor.WHITE,
        isInCheck: false,
        isTurn: false,
        timerId: whiteTimer.payload.id,
        castleRightsId: whiteCastleRights.payload.id,
      })
    );

    const blackPlayer = dispatch(
      createPlayer({
        name: data.blackName,
        color: PieceColor.BLACK,
        isInCheck: false,
        isTurn: false,
        timerId: blackTimer.payload.id,
        castleRightsId: blackCastleRights.payload.id,
      })
    );

    dispatch(
      setPlayerIds({ whitePlayerId: whitePlayer.payload.id, blackPlayerId: blackPlayer.payload.id })
    );

    // Set timers up
    const remainingSeconds = getStartingTimeInSeconds(settings.timeControl);
    dispatch(setRemainingSeconds({ id: whiteTimer.payload.id, remainingSeconds }));
    dispatch(setRemainingSeconds({ id: blackTimer.payload.id, remainingSeconds }));
    dispatch(setIsOn({ id: whiteTimer.payload.id, isOn: true }));

    // Start game
    dispatch(toggleIsPlaying());
    dispatch(setIsTurn({ id: whitePlayer.payload.id, isTurn: true }));

    // Handle game settings
    dispatch(setGameType(settings.gameType));
    dispatch(setTimeControl(settings.timeControl));
    dispatch(setIsFiftyMoveRule(settings.isFiftyMoveRule));
    dispatch(setIsIncrement(settings.isIncrement));
    dispatch(setIsUndoRedo(settings.isUndoRedo));

    navigate('/game');
  };

  const buildSettingsObject = (data: LocalGameSetupFormInputs): GameSettings => {
    return {
      gameType: GameType.LOCAL,
      timeControl: data.selectedTimeControl,
      isIncrement: data.isIncrement,
      isUndoRedo: data.isUndoRedo,
      isFiftyMoveRule: data.isFiftyMoveRule,
    };
  };

  return {
    register,
    handleSubmit,
    onSubmit,
  };
}

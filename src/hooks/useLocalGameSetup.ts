import { useForm, SubmitHandler } from 'react-hook-form';
import { GameSettings, GameType, TimeControl } from './useGameSettings';
import { useSetupGame } from './useSetupGame';
import { DEFAULT_FEN_STRING } from '../constants/defaultFen';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createTimer } from '../redux/slices/timer';
import { getStartingTimeInSeconds } from '../helpers/notation-setup/game-setup/getStartingTimeInSeconds';
import { createPlayer } from '../redux/slices/player';
import { PieceColor } from '../enums/PieceColor';
import { setPlayerIds } from '../redux/slices/gameInfo';
import { setupBoard } from '../redux/slices/board';
import { buildBoardFromFen } from '../helpers/notation-setup/game-setup/buildBoardFromFen';

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
  const gameSetup = useSetupGame();
  const { register, handleSubmit } = useForm<LocalGameSetupFormInputs>();
  const onSubmit: SubmitHandler<LocalGameSetupFormInputs> = (data) => setupGame(data);

  const setupGame = (data: LocalGameSetupFormInputs) => {
    const settings = buildSettingsObject(data);
    const whiteTimer = dispatch(createTimer(getStartingTimeInSeconds(settings.timeControl)));
    const blackTimer = dispatch(createTimer(getStartingTimeInSeconds(settings.timeControl)));

    dispatch(setupBoard(buildBoardFromFen(DEFAULT_FEN_STRING)));

    const whitePlayer = dispatch(
      createPlayer({
        name: settings.whitePlayerName,
        color: PieceColor.WHITE,
        isInCheck: false,
        timerId: whiteTimer.payload.id,
      })
    );

    const blackPlayer = dispatch(
      createPlayer({
        name: settings.blackPlayerName,
        color: PieceColor.BLACK,
        isInCheck: false,
        timerId: blackTimer.payload.id,
      })
    );

    dispatch(
      setPlayerIds({ whitePlayerId: whitePlayer.payload.id, blackPlayerId: blackPlayer.payload.id })
    );

    navigate('/game');
  };

  const buildSettingsObject = (data: LocalGameSetupFormInputs): GameSettings => {
    return {
      whitePlayerName: data.whiteName,
      blackPlayerName: data.blackName,
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

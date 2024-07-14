import { useForm, SubmitHandler } from 'react-hook-form';
import { GameSettings, GameType, TimeControl } from './useGameSettings';
import { useSetupGame } from './useSetupGame';
import { DEFAULT_FEN_STRING } from '../constants/defaultFen';
import { useNavigate } from 'react-router-dom';

export type LocalGameSetupFormInputs = {
  whiteName: string;
  blackName: string;
  selectedTimeControl: TimeControl;
  isIncrement: boolean;
  isUndoRedo: boolean;
  isFiftyMoveRule: boolean;
};

export function useLocalGameSetup() {
  const navigate = useNavigate();
  const gameSetup = useSetupGame();
  const { register, handleSubmit } = useForm<LocalGameSetupFormInputs>();
  const onSubmit: SubmitHandler<LocalGameSetupFormInputs> = (data) => setupGame(data);

  const setupGame = (data: LocalGameSetupFormInputs) => {
    gameSetup.setupGameSettings(buildSettingsObject(data));
    gameSetup.setupFromFEN(DEFAULT_FEN_STRING);
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

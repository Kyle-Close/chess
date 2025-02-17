import { GameType, TimeControl } from 'base/redux/slices/gameSettings';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSetupForLocalGame } from './useSetupForLocalGame';
import { useSetupForComputerGame } from './useSetupForComputerGame';

export interface GameSetup {
  isWhite?: boolean;
  isIncrement: boolean;
  isUndoRedo: boolean;
  isFiftyMoveRule: boolean;
  timeControl: TimeControl,
  whiteName?: string;
  blackName?: string;
  selectedTimeControl: TimeControl;
  fen?: string;
  stockfishElo?: string;
}

export function useGameSettings() {
  const { register, handleSubmit } = useForm<GameSetup>();

  const { setupLocalGame } = useSetupForLocalGame();
  const { setupComputerGame } = useSetupForComputerGame();

  const onFormSubmit: (gameType: GameType) => SubmitHandler<GameSetup> = (gameType) => {
    return (data) => {
      console.log(data)
      if (gameType === GameType.LOCAL) {
        setupLocalGame(data);
      } else if (gameType === GameType.COMPUTER) {
        setupComputerGame(data);
      }
    };
  };

  return {
    register,
    handleGameSubmit: (gameType: GameType) => handleSubmit(onFormSubmit(gameType))
  };
}

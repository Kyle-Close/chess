import { useForm, SubmitHandler } from 'react-hook-form';
import { TimeControl } from './useGameSettings';

export type LocalGameSetupFormInputs = {
  whiteName: string;
  blackName: string;
  selectedTimeControl: TimeControl;
  isIncrement: boolean;
  isUndoRedo: boolean;
  isFiftyMoveRule: boolean;
};

export function useLocalGameSetup() {
  const { register, handleSubmit } = useForm<LocalGameSetupFormInputs>();
  const onSubmit: SubmitHandler<LocalGameSetupFormInputs> = (data) => console.log(data);

  return {
    register,
    handleSubmit,
    onSubmit,
  };
}

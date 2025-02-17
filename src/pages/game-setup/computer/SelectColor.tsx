import { Switch } from "base/components/ui/switch";
import { GameSetup } from "base/features/game-settings/hooks/useGameSettings";
import { UseFormRegister } from "react-hook-form";

interface SelectColorProps {
  register: UseFormRegister<GameSetup>
}

export function SelectColor({ register }: SelectColorProps) {
  return (
    <Switch {...register('isWhite')}>Play as White</Switch>
  )
}

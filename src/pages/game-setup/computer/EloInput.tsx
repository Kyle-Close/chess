import { Input } from "@chakra-ui/react";
import { Field } from "base/components/ui/field";
import { GameSetup } from "base/features/game-settings/hooks/useGameSettings";
import { UseFormRegister } from "react-hook-form";

interface EloInputProps {
  register: UseFormRegister<GameSetup>
}

export function EloInput({ register }: EloInputProps) {
  return (
    <Field label={"Stockfish ELO"} helperText={"Set the difficulty of the computer. 1320-3190"}>
      <Input defaultValue={1320} {...register} />
    </Field>
  )
}

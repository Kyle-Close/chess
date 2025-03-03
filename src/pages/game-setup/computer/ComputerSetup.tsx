import { useGameSettings } from "base/features/game-settings/hooks/useGameSettings";
import { Box, Button } from "@chakra-ui/react";
import { AdditionalOptions } from "../AdditionalOptions";
import { FenInput } from "../FenInput";
import { EloInput } from "./EloInput";
import { GameType } from "base/redux/slices/gameSettings";
import { SelectColor } from "./SelectColor";

export function ComputerSetup() {
  const gameSettings = useGameSettings();

  return (
    <Box
      as='form'
      className='flex flex-col my-2 gap-4 flex-grow'
      onSubmit={gameSettings.handleGameSubmit(GameType.COMPUTER)}
    >
      <SelectColor register={gameSettings.register} />
      <AdditionalOptions register={gameSettings.register} />
      <FenInput register={gameSettings.register} />
      <EloInput register={gameSettings.register} />
      <Button mt='auto' type='submit' colorScheme='green'>
        Play
      </Button>
    </Box>
  );
}

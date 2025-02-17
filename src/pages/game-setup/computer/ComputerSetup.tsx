import { useGameSettings } from "base/features/game-settings/hooks/useGameSettings";
import { Box, Button } from "@chakra-ui/react";
import { AdditionalOptions } from "./AdditionalOptions";
import { FenInput } from "./FenInput";
import { PlayerNamesInputs } from "./local/PlayerNamesInputs";
import { GameType } from "base/redux/slices/gameSettings";

export function ComputerSetup() {
  const gameSettings = useGameSettings(GameType.COMPUTER);

  return (
    <Box
      as='form'
      className='flex flex-col my-2 gap-4 flex-grow'
      onSubmit={gameSettings.handleSubmit(gameSettings.onFormSubmit)}
    >
      <PlayerNamesInputs register={gameSettings.register} />
      <AdditionalOptions register={gameSettings.register} />
      <FenInput register={gameSettings.register} />
      <Button mt='auto' type='submit' colorScheme='green'>
        Play
      </Button>
    </Box>
  );
}

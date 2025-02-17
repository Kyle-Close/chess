import { useGameSettings } from "base/features/game-settings/hooks/useGameSettings";
import { Box, Button } from "@chakra-ui/react";
import { GameType } from "base/redux/slices/gameSettings";
import { AdditionalOptions } from "../AdditionalOptions";
import { FenInput } from "../FenInput";

export function ComputerSetup() {
  const gameSettings = useGameSettings(GameType.COMPUTER);

  return (
    <Box
      as='form'
      className='flex flex-col my-2 gap-4 flex-grow'
      onSubmit={gameSettings.handleSubmit(gameSettings.onFormSubmit)}
    >
      <AdditionalOptions register={gameSettings.register} />
      <FenInput register={gameSettings.register} />
      <Button mt='auto' type='submit' colorScheme='green'>
        Play
      </Button>
    </Box>
  );
}

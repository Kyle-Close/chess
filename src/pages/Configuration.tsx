import { Flex, IconButton, Text } from "@chakra-ui/react";
import { Board } from "base/features/game-board/components/Board";
import { Colors } from "base/features/game-configuration/components/Colors";
import { Custom } from "base/features/game-configuration/components/Custom";
import { Players } from "base/features/game-configuration/components/Players";
import { TimeControl } from "base/features/game-configuration/components/TimeControl";
import { Play, X } from "lucide-react";

export function Configuration() {
  return (
    <Flex flexDir='column' m={6}>
      <Flex flexDir='column'>
        <Flex alignItems='end' justifyContent='space-between'>
          <Text>Configure Your Game Settings</Text>
          <Flex mt={2} gap={6} >
            <IconButton border='1px solid rgba(255, 255, 255, 0.3)' p={4} >
              <X />
              Cancel
            </IconButton>
            <IconButton p={4} bgColor='gray.100' color='black'>
              <Play />
              Start Game
            </IconButton>
          </Flex>
        </Flex>
        <Players />
        <Colors />
        <TimeControl />
        <Custom />
      </Flex>
      <Board />
    </Flex>
  )
}

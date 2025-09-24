import { Flex, IconButton } from "@chakra-ui/react";
import { Board } from "base/features/game-board/components/Board";
import { CapturedBox } from "base/features/game-page/components/CapturedBox";
import { MoveHistoryBox } from "base/features/game-page/components/MoveHistoryBox";
import { PlayerBox } from "base/features/game-page/components/PlayerBox";
import { Flag, HandshakeIcon } from "lucide-react";

export function Play() {
  return (
    <Flex justifyContent='center' alignItems='center'>
      <Flex gap={8}>
        <Flex flexDir='column' gap={4}>
          <PlayerBox isTurn={false} materialDiff={-3} />
          <CapturedBox isWhite={false} />
        </Flex>
        <Board />
        <Flex flexDir='column' gap={4}>
          <PlayerBox isTurn={true} materialDiff={3} />
          <CapturedBox isWhite={true} />
          <MoveHistoryBox />
          <IconButton mt='auto' border='1px solid rgba(255, 255, 255, 0.3)'>
            <HandshakeIcon />
            Offer Draw
          </IconButton>
          <IconButton bgColor='red.700'>
            <Flag />
            Resign
          </IconButton>
        </Flex>
      </Flex>
    </Flex>
  )
}

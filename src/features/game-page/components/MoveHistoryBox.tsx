import { Flex, Text, ScrollArea } from "@chakra-ui/react";
import { MoveHistoryEntry } from "./MoveHistoryEntry";

export function MoveHistoryBox() {
  return (
    <Flex border='1px solid rgba(255, 255, 255, 0.3)' gap={4} flexDir='column' p={4} borderRadius='lg'>
      <Text fontWeight='semibold'>Move History</Text>
      <ScrollArea.Root>
        <ScrollArea.Viewport>
          <ScrollArea.Content maxH='8rem'>
            {tempMoves.map((move, key) => <MoveHistoryEntry key={key} count={move.count} whiteMove={move.whiteMove} blackMove={move.blackMove} />)}
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </Flex>
  )
}

const tempMoves = [
  { count: 1, whiteMove: 'e4', blackMove: 'e5' },
  { count: 2, whiteMove: 'e4', blackMove: 'e5' },
  { count: 3, whiteMove: 'e4', blackMove: 'e5' },
  { count: 4, whiteMove: 'e4', blackMove: 'e5' },
  { count: 5, whiteMove: 'e4', blackMove: 'e5' },
  { count: 6, whiteMove: 'e4', blackMove: 'e5' },
  { count: 7, whiteMove: 'e4', blackMove: 'e5' },
  { count: 8, whiteMove: 'e4', blackMove: 'e5' },
  { count: 9, whiteMove: 'e4', blackMove: 'e5' },
  { count: 10, whiteMove: 'e4', blackMove: 'e5' },
  { count: 11, whiteMove: 'e4', blackMove: 'e5' },
  { count: 12, whiteMove: 'e4', blackMove: 'e5' },
  { count: 13, whiteMove: 'e4', blackMove: 'e5' },
  { count: 14, whiteMove: 'e4', blackMove: 'e5' },
  { count: 15, whiteMove: 'e4', blackMove: 'e5' },
]

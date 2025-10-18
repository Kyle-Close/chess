import { Flex, Text, ScrollArea } from "@chakra-ui/react";
import { MoveHistoryEntry } from "./MoveHistoryEntry";

interface MoveHistoryBoxProps {
  moveHistory: string[];

}

export function MoveHistoryBox({ moveHistory }: MoveHistoryBoxProps) {
  const list = buildMoveList(moveHistory ?? []);

  return (
    <Flex border='1px solid rgba(255, 255, 255, 0.3)' gap={4} flexDir='column' p={4} borderRadius='lg' mt={6}>
      <Text fontWeight='semibold'>Move History</Text>
      <ScrollArea.Root>
        <ScrollArea.Viewport>
          <ScrollArea.Content maxH='8rem'>
            {list.map((move, key) => <MoveHistoryEntry key={key} count={move.count} whiteMove={move.whiteMove} blackMove={move.blackMove} />)}
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

interface MoveObj {
  count: number,
  whiteMove: string,
  blackMove: string
}

function buildMoveList(moves: string[] = []): MoveObj[] {
  const res: MoveObj[] = [];
  for (let i = 0; i < moves.length; i += 2) {
    res.push({
      count: Math.floor(i / 2) + 1,
      whiteMove: moves[i],
      blackMove: moves[i + 1] ?? "", // handle odd length
    });
  }
  return res.reverse();
}

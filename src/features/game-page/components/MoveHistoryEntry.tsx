import { Text, Flex } from "@chakra-ui/react";

interface MoveHistoryEntryProps {
  count: number,
  whiteMove: string,
  blackMove: string
}

export function MoveHistoryEntry({ count, whiteMove, blackMove }: MoveHistoryEntryProps) {
  return (
    <Flex gap={4}>
      <Text fontWeight='semibold'>{count.toString()}.</Text>
      <Text>{whiteMove}</Text>
      <Text>{blackMove}</Text>
    </Flex>
  )
}

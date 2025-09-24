import { Flex, Text } from "@chakra-ui/react";

export function MoveHistoryBox() {
  return (
    <Flex border='1px solid rgba(255, 255, 255, 0.3)' gap={4} flexDir='column' p={4} borderRadius='lg'>
      <Text fontWeight='semibold'>Move History</Text>
      <Flex gap={4}>
        <Text fontWeight='semibold'>1.</Text>
        <Text>e4</Text>
        <Text>e5</Text>
      </Flex>
    </Flex>
  )
}

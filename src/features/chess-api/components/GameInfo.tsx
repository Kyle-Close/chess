import { Flex, Text } from "@chakra-ui/react"

interface GameInfoProps {
  title: string,
  value: string
}

export function GameInfo({ title, value }: GameInfoProps) {
  return (
    <Flex gap='0.5rem'>
      <Text fontWeight='semibold'>{`${title}:`}</Text>
      <Text>{value}</Text>
    </Flex>
  )
}

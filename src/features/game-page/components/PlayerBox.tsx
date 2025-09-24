import { Flex, Icon, Text } from "@chakra-ui/react";
import { Clock } from "lucide-react";

interface PlayerBoxProps {
  isTurn: boolean
  materialDiff: number
}

export function PlayerBox({ isTurn, materialDiff }: PlayerBoxProps) {
  const border = isTurn ? '2px solid white' : '1px solid rgba(255, 255, 255, 0.3)'
  const materialDiffColor = materialDiff < 0 ? 'red' : 'green'
  const materialDiffSymbol = materialDiff < 0 ? '' : '+'

  return (
    <Flex flexDir='column' gap={4} alignItems='start' border={border} alignSelf='start' p='4' borderRadius='lg' minWidth='12rem'>
      <Text fontSize='lg' fontWeight='semibold'>Hikaru</Text>
      {materialDiff != 0 && <Text fontSize='sm' fontWeight='semibold' color={materialDiffColor}>{`${materialDiffSymbol}${materialDiff.toString()}`}</Text>}
      <Flex gap={4} alignItems='center'>
        <Icon>
          <Clock />
        </Icon>
        <Text fontSize='2xl' fontWeight='bold'>9:52</Text>
      </Flex>
    </Flex>
  )
}

import { Flex, Icon, Text } from "@chakra-ui/react";
import { GiChessBishop, GiChessKnight, GiChessPawn, GiChessQueen, GiChessRook, GiPawn } from "react-icons/gi";

interface CapturedBoxProps {
  isWhite: boolean
}

export function CapturedBox({ isWhite }: CapturedBoxProps) {
  return (
    <Flex flexDir='column' gap={4}>
      <Text fontWeight='semibold' fontSize='sm'>{`Captured by ${isWhite ? 'white' : 'black'}`}</Text>
      <Flex>
        <Icon>
          <GiChessPawn />
        </Icon>
        <Icon>
          <GiChessRook />
        </Icon>
        <Icon>
          <GiChessKnight />
        </Icon>
        <Icon>
          <GiChessQueen />
        </Icon>
        <Icon>
          <GiChessBishop />
        </Icon>
      </Flex>
    </Flex>
  )
}

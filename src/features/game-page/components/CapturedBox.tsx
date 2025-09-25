import { Flex, Icon, Text } from "@chakra-ui/react";
import { PieceType } from "base/zod/emums/PieceType";
import { GiChessBishop, GiChessKnight, GiChessPawn, GiChessQueen, GiChessRook } from "react-icons/gi";

interface CapturedBoxProps {
  isWhite: boolean,
  capturedPieces: PieceType[]
}

export function CapturedBox({ isWhite, capturedPieces }: CapturedBoxProps) {
  return (
    <Flex flexDir='column' gap={4}>
      <Text fontWeight='semibold' fontSize='sm'>{`Captured by ${isWhite ? 'white' : 'black'}`}</Text>
      <Flex>
        {capturedPieces && capturedPieces.map((piece, key) => getIcon(piece, key))}
      </Flex>
    </Flex>
  )
}

function getIcon(piece: PieceType, key: number) {
  switch (piece) {
    case PieceType.PAWN:
      return <Icon key={key} as={GiChessPawn} />
    case PieceType.KNIGHT:
      return <Icon key={key} as={GiChessKnight} />
    case PieceType.BISHOP:
      return <Icon key={key} as={GiChessBishop} />
    case PieceType.ROOK:
      return <Icon key={key} as={GiChessRook} />
    case PieceType.QUEEN:
      return <Icon key={key} as={GiChessQueen} />
    default:
      throw new Error('Invalid piece type capture')
  }
}

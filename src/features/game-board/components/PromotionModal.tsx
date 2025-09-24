import { BaseModal } from "base/components/BaseModal";
import { Alert, Grid, GridItem, IconButton } from '@chakra-ui/react'
import { GiChessQueen, GiChessKnight, GiChessBishop, GiChessRook } from "react-icons/gi";
import { PieceType } from "base/zod/emums/PieceType";
import { useExecuteMove } from "base/features/api-utils/hooks/useExecuteMove";

interface PromotionModalProps {
  isOpen: boolean,
  onClose: () => void,
  gameId: string,
  start: number,
  end: number,
  clearSelected: () => void
}

export function PromotionModal({ isOpen, onClose, gameId, start, end, clearSelected }: PromotionModalProps) {
  const executeMoveMutation = useExecuteMove()

  const handleButtonClick = (promotionPiece: PieceType) => {
    executeMoveMutation.mutate({ gameId, start, end, promotionPiece });
    clearSelected();
    onClose();
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <Alert.Root p={6}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Promote Your Pawn</Alert.Title>

        </Alert.Content>
      </Alert.Root>

      <Grid mt={2} gap={2} templateRows={'1fr 1fr'} templateColumns={'1fr 1fr'}>

        <GridItem flex={1} flexGrow={'1'}>
          <IconButton onClick={() => handleButtonClick(PieceType.QUEEN)} w={'100%'} h={12} aria-label="Queen" bg={'blue.600'}>
            <GiChessQueen />
          </IconButton>
        </GridItem>

        <GridItem>
          <IconButton onClick={() => handleButtonClick(PieceType.ROOK)} w={'100%'} h={12} aria-label="Rook" bg={'blue.600'}>
            <GiChessRook />
          </IconButton>
        </GridItem>

        <GridItem>
          <IconButton onClick={() => handleButtonClick(PieceType.BISHOP)} w={'100%'} h={12} aria-label="Bishop" bg={'blue.600'}>
            <GiChessBishop />
          </IconButton>
        </GridItem>

        <GridItem>
          <IconButton onClick={() => handleButtonClick(PieceType.KNIGHT)} w={'100%'} h={12} aria-label="Knight" bg={'blue.600'}>
            <GiChessKnight />
          </IconButton>
        </GridItem>

      </Grid>
    </BaseModal >
  )
}

import { Flex, Text } from "@chakra-ui/react";
import { Color } from "base/zod/emums/Color";
import { PieceType } from "base/zod/emums/PieceType";
import { getPieceSrc } from "base/features/game-board/utils/pieceAssets";
import { opposite } from "base/features/game-board/utils/gameState";

interface PlayerStripProps {
  name: string
  subtitle?: string
  color: Color
  /** Pieces this player has captured (so they are the opponent's color) */
  capturedPieces: PieceType[]
  materialAdvantage: number
  isTurn: boolean
  /** Remaining seconds, or null for untimed games */
  clock: number | null
  isThinking?: boolean
}

const LOW_TIME_SECONDS = 20;

export function PlayerStrip({ name, subtitle, color, capturedPieces, materialAdvantage, isTurn, clock, isThinking }: PlayerStripProps) {
  return (
    <Flex align='center' gap={3} h='52px' px={1}>
      <Flex
        position='relative' w='40px' h='40px' flexShrink={0} align='center' justify='center' borderRadius='lg'
        bg={color === Color.WHITE ? '#ece6da' : '#2a2e36'}
        border='1px solid' borderColor={isTurn ? 'gold.400' : 'border'}
        boxShadow={isTurn ? '0 0 0 3px rgba(228, 183, 94, 0.18)' : 'none'}
        transition='box-shadow 200ms, border-color 200ms'
      >
        <img src={getPieceSrc(PieceType.KING, color)} alt='' style={{ width: 30, height: 30 }} />
      </Flex>

      <Flex direction='column' minW={0} flex={1} gap='2px'>
        <Flex align='baseline' gap={2} minW={0}>
          <Text fontWeight='semibold' truncate>{name}</Text>
          {subtitle && <Text fontSize='xs' color='fg.muted' whiteSpace='nowrap'>{subtitle}</Text>}
          {isThinking && (
            <Flex align='center' gap={1.5} color='gold.300' fontSize='xs' whiteSpace='nowrap'>
              <span className='thinking' aria-hidden><span /><span /><span /></span>
              thinking
            </Flex>
          )}
        </Flex>
        {(capturedPieces.length > 0 || materialAdvantage > 0) && (
          <CapturedPieces pieces={capturedPieces} color={opposite(color)} advantage={materialAdvantage} />
        )}
      </Flex>

      {clock !== null && <Clock seconds={clock} running={isTurn} />}
    </Flex>
  )
}

function CapturedPieces({ pieces, color, advantage }: { pieces: PieceType[], color: Color, advantage: number }) {
  const groups = [PieceType.PAWN, PieceType.KNIGHT, PieceType.BISHOP, PieceType.ROOK, PieceType.QUEEN]
    .map((type) => ({ type, count: pieces.filter((p) => p === type).length }))
    .filter((g) => g.count > 0);

  return (
    <Flex align='center' h='18px' gap={1.5} aria-label={`${pieces.length} pieces captured`}>
      {groups.map(({ type, count }) => (
        <Flex key={type}>
          {Array.from({ length: count }, (_, i) => (
            <img
              key={i}
              src={getPieceSrc(type, color)}
              alt=''
              style={{ width: 18, height: 18, marginLeft: i === 0 ? 0 : -9, opacity: 0.9 }}
            />
          ))}
        </Flex>
      ))}
      {advantage > 0 && (
        <Text className='tabular' fontSize='xs' fontWeight='bold' color='fg.muted'>+{advantage}</Text>
      )}
    </Flex>
  )
}

function Clock({ seconds, running }: { seconds: number, running: boolean }) {
  const isLow = seconds <= LOW_TIME_SECONDS;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const display = h > 0
    ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    : `${m}:${String(s).padStart(2, '0')}`;

  return (
    <Flex
      className={`tabular${running && isLow ? ' clock--low' : ''}`}
      role='timer'
      aria-label={`${m} minutes ${s} seconds remaining`}
      align='center'
      justify='flex-end'
      minW='104px'
      h='44px'
      px={4}
      borderRadius='lg'
      fontSize='xl'
      fontWeight='bold'
      transition='background-color 200ms, color 200ms'
      bg={running ? (isLow ? '#8e1f19' : '#ece6da') : 'ink.800'}
      color={running ? (isLow ? 'white' : '#15171b') : isLow ? '#f08a82' : 'fg.muted'}
      border='1px solid'
      borderColor={running ? 'transparent' : 'border'}
    >
      {display}
    </Flex>
  )
}

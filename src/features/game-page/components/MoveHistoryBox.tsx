import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

interface MoveHistoryBoxProps {
  moveHistory: string[];
}

export function MoveHistoryBox({ moveHistory }: MoveHistoryBoxProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rows = buildMoveList(moveHistory ?? []);
  const lastPly = moveHistory.length - 1;

  // Keep the latest move in view
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [moveHistory.length]);

  return (
    <Flex direction='column' minH={0} flex={1}>
      <Flex align='center' justify='space-between' px={5} py={3} borderBottom='1px solid' borderColor='border'>
        <Text fontSize='xs' fontWeight='semibold' letterSpacing='0.12em' textTransform='uppercase' color='fg.muted'>Moves</Text>
        {moveHistory.length > 0 && <Text className='tabular' fontSize='xs' color='fg.subtle'>{moveHistory.length} ply</Text>}
      </Flex>

      <Box ref={scrollRef} flex={1} minH={{ base: '120px', lg: 0 }} maxH={{ base: '220px', lg: 'none' }} overflowY='auto' py={2}>
        {rows.length === 0 ? (
          <Text px={5} py={6} fontSize='sm' color='fg.subtle' textAlign='center'>No moves yet. White to play.</Text>
        ) : (
          <Box as='ol' className='tabular' fontSize='sm'>
            {rows.map((row, i) => (
              <Flex as='li' key={row.count} align='center' px={3} bg={i % 2 === 1 ? 'whiteAlpha.50' : undefined}>
                <Text w='40px' pl={2} color='fg.subtle'>{row.count}.</Text>
                <MoveCell san={row.whiteMove} isLatest={i * 2 === lastPly} />
                <MoveCell san={row.blackMove} isLatest={i * 2 + 1 === lastPly} />
              </Flex>
            ))}
          </Box>
        )}
      </Box>
    </Flex>
  )
}

function MoveCell({ san, isLatest }: { san: string, isLatest: boolean }) {
  return (
    <Text
      flex={1}
      my='2px'
      px={2}
      py='3px'
      borderRadius='md'
      fontWeight={isLatest ? 'bold' : 'medium'}
      color={isLatest ? 'gold.200' : 'fg'}
      bg={isLatest ? 'gold.muted' : undefined}
    >
      {san}
    </Text>
  )
}

interface MoveRow {
  count: number,
  whiteMove: string,
  blackMove: string
}

function buildMoveList(moves: string[] = []): MoveRow[] {
  const res: MoveRow[] = [];
  for (let i = 0; i < moves.length; i += 2) {
    res.push({
      count: Math.floor(i / 2) + 1,
      whiteMove: moves[i],
      blackMove: moves[i + 1] ?? "", // handle odd length
    });
  }
  return res;
}

import { useChessApi } from '../features/chess-api/hooks/useChessApi.ts';
import { Button, Input, Flex, Field, Box, Heading, Text, Separator } from '@chakra-ui/react';
import { Board } from '../features/game-board/components/Board.tsx'
import { GameStatus } from 'base/zod/emums/GameStatus.ts';

export function ChessApi() {
  const { form, onSubmit, gameMutation, gameData } = useChessApi()

  if (!gameMutation.data || !gameData) return;

  function buildGameInfoComponent(title: string, value: string, key: number) {
    return (
      <Flex key={key} gap='0.5rem'>
        <Text fontWeight='semibold'>{`${title}:`}</Text>
        <Text>{value}</Text>
      </Flex>
    )
  }

  function gameStatusToString(status: GameStatus) {
    switch (status) {
      case GameStatus.ONGOING:
        return 'Ongoing'
      case GameStatus.IN_CHECK:
        return 'In Check'
      case GameStatus.CHECKMATE:
        return 'Checkmate'
      case GameStatus.DRAW_STALEMATE:
        return 'Draw by stalemate'
      case GameStatus.DRAW_THREE_FOLD_REPETITION:
        return 'Draw by three fold repetition'
      case GameStatus.DRAW_FIFTY_MOVE_RULE:
        return 'Draw by fifty move rule'
      case GameStatus.DRAW_INSUFFICIENT_MATERIAL:
        return 'Draw by insufficient material'
      case GameStatus.DRAW_BY_AGREEMENT:
        return 'Draw by agreement'
    }
  }

  const gameInfoList = [
    { title: 'Game Status', value: gameStatusToString(gameData.status) },
    { title: 'White Material', value: gameData.whiteMaterialValue.toString() },
    { title: 'Black Material', value: gameData.blackMaterialValue.toString() },
    { title: 'Turn', value: gameData.activeColor == 0 ? "White" : "Black" },
    { title: 'Half Moves', value: gameData.halfMoves.toString() },
    { title: 'Full Moves', value: gameData.fullMoves.toString() },
    { title: 'Move History', value: 'TODO' },
    { title: 'Fen History', value: 'TODO' },
  ]

  return (
    <Flex flexDir='column' minH='full' justify='center' gap='2' position='relative'>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Flex gap='2' alignItems='end'>
          <Field.Root>
            <Field.Label>FEN</Field.Label>
            <Input {...form.register('fen')} p='3' bg='whiteAlpha.400' placeholder='Enter FEN' fontSize='sm'></Input>
          </Field.Root>
          <Button type='submit' p='2' variant='solid' bg='cyan.500'>Submit</Button>
        </Flex>
      </form>
      <Board />
      <Box position='absolute' right='-35%' bg='gray.700' p='4' rounded='md'>
        <Heading fontWeight='bold' fontSize='xl' size='xl'>Game Info</Heading>
        <Separator mb='1rem' variant='solid' size='lg' height='1px' bg='gray.300' />

        {gameInfoList.map((data, key) => (
          buildGameInfoComponent(data.title, data.value, key)
        ))}
      </Box>
    </Flex>
  );
}

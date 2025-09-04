import { useChessApi } from '../features/chess-api/hooks/useChessApi.ts';
import { Button, Input, Flex, Field, Box, Heading, Text, Separator } from '@chakra-ui/react';
import { Board } from '../features/game-board/components/Board.tsx'
import { Game } from '../zod/GameSchema.ts';

export function ChessApi() {
  const { form, onSubmit, gameMutation } = useChessApi()

  if (!gameMutation.data) return;

  function buildGameInfoComponent(title: string, value: string) {
    return (
      <Flex gap='0.5rem'>
        <Text fontWeight='semibold'>{`${title}:`}</Text>
        <Text>{value}</Text>
      </Flex>
    )
  }

  const gameInfoList = [
    { title: 'Turn', value: gameMutation.data.activeColor.toString() },
    { title: 'Half Moves', value: gameMutation.data.halfMoves.toString() },
    { title: 'Full Moves', value: gameMutation.data.fullMoves.toString() },
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
      <Board board={gameMutation.data.board} />
      <Box position='absolute' right='-35%' bg='gray.700' p='4' rounded='md'>
        <Heading fontWeight='bold' fontSize='xl' size='xl'>Game Info</Heading>
        <Separator mb='1rem' variant='solid' size='lg' height='1px' bg='gray.300' />

        {gameInfoList.map(data => (
          buildGameInfoComponent(data.title, data.value)
        ))}
      </Box>
    </Flex>
  );
}

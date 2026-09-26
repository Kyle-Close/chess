import { Box, Button, chakra, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { ArrowLeft, Play } from "lucide-react";
import { FormEventHandler, ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import { BoardView } from "base/features/game-board/components/BoardView";
import { buildBoardFromFen } from "base/features/game-board/utils/board-utility/buildBoardFromFen";
import { getFenPlacement } from "../utils/fen";
import { useServerStatus } from "base/features/api-utils/hooks/useServerStatus";

export interface SummaryRow {
  label: string,
  value: ReactNode
}

interface ConfigLayoutProps {
  eyebrow: string,
  title: string,
  description: string,
  onSubmit: FormEventHandler<HTMLFormElement>,
  fen?: string,
  flipped?: boolean,
  summary: SummaryRow[],
  isPending: boolean,
  error: Error | null,
  children: ReactNode
}

export function ConfigLayout({ eyebrow, title, description, onSubmit, fen, flipped, summary, isPending, error, children }: ConfigLayoutProps) {
  const serverStatus = useServerStatus();
  const pieces = buildBoardFromFen(getFenPlacement(fen)).map((s) => s.piece);

  return (
    <chakra.form onSubmit={onSubmit} noValidate maxW='1120px' w='full' mx='auto' px={{ base: 4, md: 8 }} pt={{ base: 6, md: 10 }} pb={16}>
      <RouterLink to='/'>
        <Flex display='inline-flex' align='center' gap={1.5} fontSize='sm' color='fg.muted' _hover={{ color: 'fg' }} transition='color 150ms'>
          <ArrowLeft size={16} /> All game modes
        </Flex>
      </RouterLink>

      <Box mt={5} mb={8} className='rise-in'>
        <Text fontSize='xs' fontWeight='semibold' letterSpacing='0.14em' textTransform='uppercase' color='gold.300'>{eyebrow}</Text>
        <Heading as='h1' mt={2} fontFamily='heading' fontWeight='600' fontSize={{ base: '3xl', md: '5xl' }} letterSpacing='-0.02em' lineHeight='1.1'>{title}</Heading>
        <Text mt={3} color='fg.muted' fontSize={{ base: 'md', md: 'lg' }} maxW='40rem'>{description}</Text>
      </Box>

      <Grid templateColumns={{ base: '1fr', lg: '1fr 360px' }} gap={6} alignItems='start'>
        <Flex direction='column' gap={4} minW={0}>{children}</Flex>

        <Box as='aside' position={{ lg: 'sticky' }} top='88px' p={5} borderRadius='2xl' bg='ink.900' border='1px solid' borderColor='border'>
          <Text fontSize='xs' fontWeight='semibold' letterSpacing='0.12em' textTransform='uppercase' color='fg.muted' mb={4}>Preview</Text>
          <Box maxW={{ base: '320px', lg: 'none' }} mx='auto'>
            <BoardView pieces={pieces} flipped={flipped} showCoords={false} />
          </Box>

          <Box as='dl' mt={5}>
            {summary.map((row) => (
              <Flex key={row.label} justify='space-between' gap={4} py={2.5} borderBottom='1px solid' borderColor='border.muted' fontSize='sm'>
                <Text as='dt' color='fg.muted'>{row.label}</Text>
                <Text as='dd' fontWeight='medium' textAlign='right' truncate>{row.value}</Text>
              </Flex>
            ))}
          </Box>

          <Button type='submit' mt={5} w='full' size='lg' colorPalette='gold' fontWeight='semibold' loading={isPending} loadingText='Starting game…'>
            <Play fill='currentColor' /> Start game
          </Button>

          {error ? (
            <Text mt={3} fontSize='sm' color='#f0948c' role='alert'>
              Couldn't start the game{error.message ? `: ${error.message}` : ''}. Please try again.
            </Text>
          ) : (isPending || serverStatus === 'waking') && (
            <Text mt={3} fontSize='xs' color='fg.subtle' textAlign='center'>
              The game server sleeps when idle, so the first game can take a few seconds to start.
            </Text>
          )}
        </Box>
      </Grid>
    </chakra.form>
  )
}

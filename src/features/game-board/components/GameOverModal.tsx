import { BaseModal } from "base/components/BaseModal";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Crown, Handshake, Trophy } from 'lucide-react'
import { Game } from "base/zod/GameSchema";
import { GameType } from "base/zod/emums/GameType";
import { Color } from "base/zod/emums/Color";
import { useNavigate } from "react-router-dom";
import { getGameOverReason, getHumanColor, isDrawStatus } from "../utils/gameState";
import { getPlayerName } from "base/features/game-page/utils/players";

interface GameOverModalProps {
  isOpen: boolean,
  onClose: () => void,
  game: Game
}

type Outcome = 'win' | 'loss' | 'draw';

const OUTCOME_STYLE: Record<Outcome, { icon: typeof Trophy, color: string, glow: string }> = {
  win: { icon: Trophy, color: '#e4b75e', glow: 'rgba(228, 183, 94, 0.22)' },
  loss: { icon: Crown, color: '#e5736b', glow: 'rgba(229, 115, 107, 0.2)' },
  draw: { icon: Handshake, color: '#9fb4d6', glow: 'rgba(159, 180, 214, 0.2)' },
};

export function GameOverModal({ isOpen, onClose, game }: GameOverModalProps) {
  const navigate = useNavigate()
  const isDraw = isDrawStatus(game.status);
  const human = getHumanColor(game);
  const reason = getGameOverReason(game.status);
  const moveCount = Math.ceil(game.moveHistory.length / 2);

  let outcome: Outcome = 'win';
  let heading = 'Draw';
  if (isDraw) outcome = 'draw';
  else if (human !== null) {
    outcome = game.winner === human ? 'win' : 'loss';
    heading = outcome === 'win' ? 'You won' : 'Stockfish wins';
  } else if (game.winner !== null) {
    heading = `${getPlayerName(game, game.winner)} wins`;
  } else {
    heading = 'Game over';
  }

  const score = isDraw ? '½–½' : game.winner === Color.WHITE ? '1–0' : game.winner === Color.BLACK ? '0–1' : '–';
  const { icon: OutcomeIcon, color, glow } = OUTCOME_STYLE[outcome];

  const startNewGame = () => navigate(game.type === GameType.STOCKFISH ? '/configure/stockfish' : '/configure/local');

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} allowClose={true}>
      <Box position='relative' px={8} pt={10} pb={7} textAlign='center'>
        <Box position='absolute' inset={0} pointerEvents='none' style={{ background: `radial-gradient(320px 180px at 50% 0%, ${glow}, transparent 70%)` }} />

        <Flex position='relative' direction='column' align='center' gap={2}>
          <Flex
            w={16} h={16} mb={2} align='center' justify='center' borderRadius='full'
            border='1px solid' style={{ borderColor: color, color, boxShadow: `0 0 40px ${glow}` }}
            className='rise-in'
          >
            <OutcomeIcon size={30} strokeWidth={1.75} />
          </Flex>
          <Text fontSize='xs' fontWeight='semibold' letterSpacing='0.14em' textTransform='uppercase' color='fg.muted'>
            {reason}
          </Text>
          <Heading as='h2' fontFamily='heading' fontSize='4xl' fontWeight='600' lineHeight='1.1'>{heading}</Heading>
        </Flex>

        <Flex position='relative' mt={7} borderRadius='xl' border='1px solid' borderColor='border' bg='ink.900' divideX='1px' divideColor='border'>
          <Stat label='Result' value={score} />
          <Stat label='Moves' value={String(moveCount)} />
          <Stat label='Duration' value={formatDuration(game.startTime, game.endTime)} />
        </Flex>

        <Flex position='relative' mt={6} gap={3}>
          <Button flex={1} variant='outline' borderColor='border.emphasized' onClick={onClose}>View board</Button>
          <Button flex={1} colorPalette='gold' fontWeight='semibold' onClick={startNewGame}>New game</Button>
        </Flex>
      </Box>
    </BaseModal>
  )
}

function Stat({ label, value }: { label: string, value: string }) {
  return (
    <Flex flex={1} direction='column' py={3} gap={0.5}>
      <Text className='tabular' fontSize='lg' fontWeight='bold'>{value}</Text>
      <Text fontSize='xs' color='fg.muted'>{label}</Text>
    </Flex>
  )
}

function formatDuration(start: string, end: string | null) {
  if (!end) return '–';
  const clean = (s: string) => s.replace(/\.\d+/, "");
  const seconds = Math.max(0, Math.round((new Date(clean(end)).getTime() - new Date(clean(start)).getTime()) / 1000));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h) return `${h}h ${String(m).padStart(2, "0")}m`;
  if (m) return `${m}m ${String(s).padStart(2, "0")}s`;
  return `${s}s`;
}

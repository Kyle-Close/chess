import { BaseModal } from "base/components/BaseModal";
import { Flex, Heading, Icon, Text, Badge, Separator, Button } from "@chakra-ui/react";
import { Clock, Crown, Handshake, Target, Trophy } from 'lucide-react'
import { Game } from "base/zod/GameSchema";
import { GameStatus } from "base/zod/emums/GameStatus";
import { GameType } from "base/zod/emums/GameType";
import { useNavigate } from "react-router-dom";

interface GameOverModalProps {
  isOpen: boolean,
  onClose: () => void,
  game: Game
}

export function GameOverModal({ isOpen, onClose, game }: GameOverModalProps) {
  const navigate = useNavigate()
  function GetGameOverReason(status: GameStatus) {
    switch (status) {
      case GameStatus.CHECKMATE:
        return 'Checkmate'
      case GameStatus.DRAW_BY_AGREEMENT:
        return 'Draw by agreement'
      case GameStatus.DRAW_STALEMATE:
        return 'Stalemate'
      case GameStatus.DRAW_INSUFFICIENT_MATERIAL:
        return 'Insufficient material'
      case GameStatus.DRAW_FIFTY_MOVE_RULE:
        return 'Fifty move rule'
      case GameStatus.DRAW_THREE_FOLD_REPETITION:
        return 'Three-fold repetition'
      case GameStatus.RESIGNATION:
        return 'Resignation'
      case GameStatus.TIMEOUT:
        return 'Time'
    }
  }

  function getHeadingText() {
    if (game.status === GameStatus.DRAW_BY_AGREEMENT || game.status === GameStatus.DRAW_STALEMATE ||
      game.status === GameStatus.DRAW_INSUFFICIENT_MATERIAL || game.status === GameStatus.DRAW_FIFTY_MOVE_RULE ||
      game.status === GameStatus.DRAW_THREE_FOLD_REPETITION) {
      return 'Draw'
    }

    // If local game is not a draw always display victory text. Last player to use the device will want to see this screen
    if (game.type === GameType.LOCAL) {
      return 'Victory!'
    }

    if (game.winner === game.stockfishInfo?.playingAs) {
      return 'Defeat';
    } else return 'Victory'
  }

  function getTextUnderHeading() {
    if (game.status === GameStatus.DRAW_BY_AGREEMENT || game.status === GameStatus.DRAW_STALEMATE ||
      game.status === GameStatus.DRAW_INSUFFICIENT_MATERIAL || game.status === GameStatus.DRAW_FIFTY_MOVE_RULE ||
      game.status === GameStatus.DRAW_THREE_FOLD_REPETITION) {
      return 'The match ended in a draw'
    }

    // If local game is not a draw always display victory text. Last player to use the device will want to see this screen
    if (game.type === GameType.LOCAL) {
      return 'You defeated your opponent';
    }

    if (game.winner === game.stockfishInfo?.playingAs) {
      return 'Opponent defeated you';
    }

    return 'You defeated your opponent';
  }

  function getIcon() {
    if (game.status === GameStatus.DRAW_BY_AGREEMENT || game.status === GameStatus.DRAW_STALEMATE ||
      game.status === GameStatus.DRAW_INSUFFICIENT_MATERIAL || game.status === GameStatus.DRAW_FIFTY_MOVE_RULE ||
      game.status === GameStatus.DRAW_THREE_FOLD_REPETITION) {
      return <Handshake color="blue" size={48} />
    }

    // If local game is not a draw always display victory text. Last player to use the device will want to see this screen
    if (game.type === GameType.LOCAL) {
      return <Trophy color="gold" size={48} />
    }

    if (game.winner === game.stockfishInfo?.playingAs) {
      return <Crown color="red" size={48} />;
    }

    return <Trophy color="gold" size={48} />
  }

  function getBadge() {
    if (game.status === GameStatus.DRAW_BY_AGREEMENT || game.status === GameStatus.DRAW_STALEMATE ||
      game.status === GameStatus.DRAW_INSUFFICIENT_MATERIAL || game.status === GameStatus.DRAW_FIFTY_MOVE_RULE ||
      game.status === GameStatus.DRAW_THREE_FOLD_REPETITION) {

      return <Badge size='lg' colorPalette='white'>{GetGameOverReason(game.status)}</Badge>
    }

    // If local game is not a draw always display victory text. Last player to use the device will want to see this screen
    if (game.type === GameType.LOCAL) {
      return <Badge size='lg' colorPalette='blue'>{GetGameOverReason(game.status)}</Badge>
    }

    // TODO: Implement correct Icon. Need to check what color player is and compare to game.winner
    if (game.winner === game.stockfishInfo?.playingAs) {
      return <Badge size='lg' colorPalette='red'>{GetGameOverReason(game.status)}</Badge>
    }

    return <Badge size='lg' colorPalette='blue'>{GetGameOverReason(game.status)}</Badge>
  }

  function calculateGameTime() {
    const start = game.startTime;
    const end = game.endTime;

    if (!end) {
      return "";
    }

    const clean = (s: string) => s.replace(/\.\d+/, "");
    const diffSeconds = Math.max(
      0,
      Math.round(
        (new Date(clean(end)).getTime() - new Date(clean(start)).getTime()) / 1000
      )
    );

    const h = Math.floor(diffSeconds / 3600);
    const m = Math.floor((diffSeconds % 3600) / 60);
    const s = diffSeconds % 60;

    if (h) return `${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
    if (m) return `${m}m ${s}s`;
    return `${s}s`;
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} allowClose={true}>
      <Flex gap={2} p={8} flexDir='column' alignItems='center' pr={16} pl={16}>
        <Icon flexGrow={1}>
          {getIcon()}
        </Icon>
        <Heading size='2xl' fontSize='2xl'>{getHeadingText()}</Heading>
        <Text>{getTextUnderHeading()}</Text>
        {getBadge()}
        <Separator w='100%' h='1px' bg='gray.500' mt={2} />
        <Flex gap={12} justifyContent='center' w='100%' m={2}>
          <Flex flexDir='column' alignItems='center'>
            <Icon>
              <Clock />
            </Icon>
            <Text fontWeight='bold' mt={1}>{calculateGameTime()}</Text>
            <Text>Duration</Text>
          </Flex>
          <Flex flexDir='column' alignItems='center'>
            <Icon>
              <Target />
            </Icon>
            <Text fontWeight='bold' mt={1}>{game.fullMoves}</Text>
            <Text>Moves</Text>
          </Flex>
        </Flex>
        <Separator w='100%' h='1px' bg='gray.500' />
        <Flex justifyContent='center' w='100%' mt={4} gap={2}>
          <Button disabled flexGrow={1} border='solid 1px gray' p={4} fontWeight='semibold'>Analyze Game</Button>
          <Button flexGrow={1} bg='gray.100' p={4} color='black' fontWeight='bold' onClick={() => navigate('/')}>New Game</Button>
        </Flex>
      </Flex>
    </BaseModal>
  )
}

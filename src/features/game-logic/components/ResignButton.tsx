import { IconButton } from '@chakra-ui/react';
import { FaFlag } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../game-board/hooks/useBoard';
import {
  MatchResult,
  MatchResultSubType,
  setIsPlaying,
  setMatchResult,
  setMatchResultSubType,
} from '../../../redux/slices/gameInfo';
import { selectPlayerById } from '../../../redux/slices/player';
import { setIsOn } from '../../../redux/slices/timer';
import { PieceColor } from 'base/features/game-board/hooks/usePiece';

interface ResignButtonProps {
  openModal: () => void;
  playerId: string;
}

export function ResignButton({ openModal, playerId }: ResignButtonProps) {
  const player = useAppSelector((state) => selectPlayerById(state, playerId));
  const dispatch = useAppDispatch();

  if (!player.isTurn) return <></>;

  const handleClick = () => {
    const matchResult =
      player.color === PieceColor.WHITE ? MatchResult.BLACK_WIN : MatchResult.WHITE_WIN;
    dispatch(setMatchResult(matchResult));
    dispatch(setMatchResultSubType(MatchResultSubType.RESIGNATION));
    dispatch(setIsPlaying(false));
    dispatch(setIsOn({ id: player.timerId, isOn: false }));
    dispatch(setIsOn({ id: player.timerId, isOn: false }));
    openModal();
  };

  return (
    <IconButton
      onClick={handleClick}
      size='sm'
      colorScheme='red'
      aria-label='Resign Game'
      children={<FaFlag />}
    />
  );
}

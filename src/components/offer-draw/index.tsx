import { IconButton } from '@chakra-ui/react';
import { FaHandshake } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../hooks/useBoard';
import {
  MatchResult,
  MatchResultSubType,
  setIsPlaying,
  setMatchResult,
  setMatchResultSubType,
} from '../../redux/slices/gameInfo';
import { setIsOn } from '../../redux/slices/timer';
import { selectPlayerById } from '../../redux/slices/player';

interface OfferDrawButtonProps {
  playerId: string;
  openModal: () => void;
}

export function OfferDrawButton({ openModal, playerId }: OfferDrawButtonProps) {
  const dispatch = useAppDispatch();
  const player = useAppSelector((state) => selectPlayerById(state, playerId));
  const visibility = player.isTurn ? 'visible' : 'hidden';

  const handleClick = () => {
    dispatch(setMatchResult(MatchResult.DRAW));
    dispatch(setMatchResultSubType(MatchResultSubType.MUTUAL_AGREEMENT));
    dispatch(setIsPlaying(false));
    dispatch(setIsOn({ id: player.timerId, isOn: false }));
    dispatch(setIsOn({ id: player.timerId, isOn: false }));
    openModal();
  };

  return (
    <IconButton
      visibility={visibility}
      size='sm'
      onClick={handleClick}
      aria-label='Offer Draw'
      icon={<FaHandshake />}
      colorScheme='orange'
    />
  );
}

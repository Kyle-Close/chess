import { Box } from '@chakra-ui/react';
import WhitePlayerImg from '../../../assets/profile-white.png';
import BlackPlayerImg from '../../../assets/profile-black.png';
import { useAppSelector } from '../../../hooks/useBoard';
import { MatchResult } from '../../../redux/slices/gameInfo';
import { TitleSection } from './TitleSection';
import { ButtonSection } from './ButtonSection';

interface ResultProps {
  closeModal: () => void;
}
export function Result({ closeModal }: ResultProps) {
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const imgSrc = gameInfo.matchResult === MatchResult.WHITE_WIN ? WhitePlayerImg : BlackPlayerImg;

  return (
    <Box borderRadius='1rem 1rem 0 0' className='flex flex-col bg-gray-300 gap-6 p-8'>
      <TitleSection />
      <Box className='flex gap-10 justify-between items-end caveat'>
        <Box className='max-w-16 max-h-16' as='img' src={imgSrc} />
        <ButtonSection closeModal={closeModal} />
      </Box>
    </Box>
  );
}

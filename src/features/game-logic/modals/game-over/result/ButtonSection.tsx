import { Box, Button } from '@chakra-ui/react';
import { useResetGame } from 'base/features/game-settings/hooks/useResetGame';
import { useNavigate } from 'react-router-dom';

interface ButtonSectionProps {
  closeModal: () => void;
}

export function ButtonSection({ closeModal }: ButtonSectionProps) {
  const navigate = useNavigate();
  const { reset } = useResetGame();

  const handleRematch = () => {
    reset
    closeModal();
  };

  return (
    <Box className='flex-grow flex flex-col gap-2'>
      <Button
        onClick={handleRematch}
        fontSize='large'
        colorScheme='green'
        borderRadius='99999px'
        className='w-24 self-center border-black border-2 drop-shadow-lg hover:scale-105 active:scale-95'
      >
        Rematch
      </Button>
      <Button
        onClick={() => navigate('/setup')}
        fontSize='large'
        colorScheme='blue'
        borderRadius='99999px'
        className='border-black border-2 drop-shadow-lg hover:scale-105 active:scale-95'
      >
        New Game
      </Button>
    </Box>
  );
}

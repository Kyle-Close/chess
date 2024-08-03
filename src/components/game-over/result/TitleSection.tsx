import { Box, Heading, Text } from '@chakra-ui/react';
import { useAppSelector } from '../../../hooks/useBoard';
import { MatchResult, MatchResultSubType } from '../../../redux/slices/gameInfo';

export function TitleSection() {
  // Game over possibilities
  // ----------------------------------------
  // checkmate - white or black !
  // time - white or black !
  // resignation - white or black
  // draw - stalemate, <threefold repitition!>, fifty move rule, insufficient material, <mutual agreement !> !

  const gameInfo = useAppSelector((state) => state.gameInfo);

  function getGameOverTitle() {
    const result = gameInfo.matchResult;

    switch (result) {
      case MatchResult.WHITE_WIN:
        return 'White Wins!';
      case MatchResult.BLACK_WIN:
        return 'Black Wins!';
      case MatchResult.DRAW:
        return 'Draw';
      case MatchResult.ONGOING:
        return 'Ongoing';
    }
  }

  function getTransitionWord() {
    if (gameInfo.matchResult === MatchResult.ONGOING) return '';
    if (gameInfo.matchResult === MatchResult.DRAW) return 'Due to';

    const subType = gameInfo.matchResultSubType;
    if (subType === MatchResultSubType.TIME) return 'On';
    else return 'By';
  }

  function getSubResultWord() {
    const subType = gameInfo.matchResultSubType;
    switch (subType) {
      case MatchResultSubType.CHECKMATE:
        return 'Checkmate';
      case MatchResultSubType.TIME:
        return 'Time';
      case MatchResultSubType.RESIGNATION:
        return 'Resignation';
      case MatchResultSubType.FIFTY_MOVE_RULE:
        return 'Fifty Move Rule';
      case MatchResultSubType.INSUFFICIENT_MATERIAL:
        return 'Insufficient Material';
      case MatchResultSubType.STALEMATE:
        return 'Stalemate';
      case MatchResultSubType.THREE_FOLD_REPITITION:
        return 'Three Fold Repitition';
      case MatchResultSubType.MUTUAL_AGREEMENT:
        return 'Mutual Agreement';
      default:
        return '';
    }
  }

  return (
    <Box fontFamily='Montserrat Alternates' className='flex flex-col item-center'>
      <Heading as='h1' textAlign='center' fontFamily='Montserrat Alternates' fontSize='large'>
        {getGameOverTitle()}
      </Heading>
      <Box className='flex gap-2 justify-center'>
        <Text fontSize='large' fontFamily='caveat' fontWeight='bold' textAlign='center'>
          {getTransitionWord()}
        </Text>
        <Text fontSize='large' fontFamily='caveat' fontWeight='bold' textAlign='center'>
          {getSubResultWord()}
        </Text>
      </Box>
    </Box>
  );
}

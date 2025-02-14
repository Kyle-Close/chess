import { Box, Text } from "@chakra-ui/react";
import { useAppSelector } from "base/features/game-board/hooks/useBoard";
import { PieceColor } from "base/features/game-board/hooks/usePiece";
import { getRemainingPiecesByColor } from "base/helpers/game-core/piece-management/getRemainingPiecesByColor";
import { convertSecondsToMin } from "base/helpers/utilities/convertSecondsToMin";
import { TimeControl } from "base/redux/slices/gameSettings";
import { selectPlayerById } from "base/redux/slices/player";
import { selectTimerById } from "base/redux/slices/timer";

interface GameOverDataRow {
  title: string;
  whiteData: string;
  blackData: string;
}

export function Stats() {
  const board = useAppSelector((state) => state.board);
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const gameSettings = useAppSelector((state) => state.gameSettings);
  const whitePlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.whitePlayerId));
  const blackPlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.blackPlayerId));
  const whiteTimer = useAppSelector((state) => selectTimerById(state, whitePlayer.timerId));
  const blackTimer = useAppSelector((state) => selectTimerById(state, blackPlayer.timerId));

  const titleClass = 'text-white';
  const dataClass = 'text-green-200';

  const whiteTimeRemaining =
    gameSettings.timeControl === TimeControl.FREE_PLAY
      ? '∞'
      : convertSecondsToMin(whiteTimer.remainingSeconds);
  const blackTimeRemaining =
    gameSettings.timeControl === TimeControl.FREE_PLAY
      ? '∞'
      : convertSecondsToMin(blackTimer.remainingSeconds);

  const totalMoves = gameInfo.fullMoves.toString();
  const whiteRemainingPieces = getRemainingPiecesByColor(board, PieceColor.WHITE);
  const blackRemainingPieces = getRemainingPiecesByColor(board, PieceColor.BLACK);

  const whiteCaptureCount = 16 - blackRemainingPieces.length;
  const blackCaptureCount = 16 - whiteRemainingPieces.length;

  function buildDataRow(data: GameOverDataRow) {
    return (
      <>
        <Text fontWeight='bold' fontSize='large' fontFamily='caveat' className={titleClass}>
          {data.title}
        </Text>
        <Box borderRight='1px solid white' className='flex flex-grow justify-center'>
          <Text
            alignSelf='center'
            justifySelf='center'
            fontFamily='Montserrat Alternates'
            className={dataClass}
          >
            {data.whiteData}
          </Text>
        </Box>
        <Box className='flex flex-grow justify-center'>
          <Text
            alignSelf='center'
            justifySelf='center'
            fontFamily='Montserrat Alternates'
            className={dataClass}
          >
            {data.blackData}
          </Text>
        </Box>
      </>
    );
  }

  return (
    <Box borderRadius='0 0 1rem 1rem' className='bg-black grid grid-cols-3 p-4 py-6'>
      <Box mb='1rem' />
      <Text
        mb='1rem'
        fontWeight='bold'
        justifySelf='center'
        fontSize='x-large'
        fontFamily='caveat'
        className={titleClass}
      >
        White
      </Text>
      <Text
        mb='1rem'
        fontWeight='bold'
        justifySelf='center'
        fontSize='x-large'
        fontFamily='caveat'
        className={titleClass}
      >
        Black
      </Text>
      {buildDataRow({
        title: 'Clock',
        whiteData: whiteTimeRemaining,
        blackData: blackTimeRemaining,
      })}
      {buildDataRow({
        title: 'Captures',
        whiteData: whiteCaptureCount.toString(),
        blackData: blackCaptureCount.toString(),
      })}
      {buildDataRow({ title: 'Total Moves', whiteData: totalMoves, blackData: totalMoves })}
    </Box>
  );
}

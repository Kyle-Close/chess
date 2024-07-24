import { useAppSelector } from '../../hooks/useBoard';
import { usePlayer } from '../../hooks/usePlayer';

export function GameInfo() {
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const whitePlayer = usePlayer({ playerId: gameInfo.whitePlayerId });
  const blackPlayer = usePlayer({ playerId: gameInfo.blackPlayerId });
  const isWhiteInCheck = whitePlayer.isInCheck;
  const isBlackInCheck = blackPlayer.isInCheck;

  const playerOneClasses = [];
  if (isWhiteInCheck) playerOneClasses.push('text-red-700');
  if (gameInfo.halfMoves % 2 === 0) playerOneClasses.push('font-bold');

  const playerTwoClasses = [];
  if (isBlackInCheck) playerTwoClasses.push('text-red-700');
  if (gameInfo.halfMoves % 2 !== 0) playerTwoClasses.push('font-bold');

  return (
    <div className='flex gap-16'>
      <div>
        <h6 className={playerOneClasses.join(' ')}>{whitePlayer.name}</h6>
      </div>
      <div>
        <h6>{gameInfo.halfMoves}</h6>
      </div>
      <div>
        <h6 className={playerTwoClasses.join(' ')}>{blackPlayer.name}</h6>
      </div>
    </div>
  );
}

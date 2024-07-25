import { Timer } from './Timer';
import whitePlayerImg from '../../assets/profile-white.png';
import blackPlayerImg from '../../assets/profile-black.png';
import { useAppSelector } from '../../hooks/useBoard';
import { selectPlayerById } from '../../redux/slices/player';
import { PieceColor } from '../../enums/PieceColor';

interface PlayerDataProps {
  playerId: string;
}
export function PlayerData({ playerId }: PlayerDataProps) {
  const player = useAppSelector((state) => selectPlayerById(state, playerId));
  return (
    <div className={getPlayerDataClasses()}>
      <img
        className='max-w-12 max-h-12 ml-4'
        src={player.color === PieceColor.WHITE ? whitePlayerImg : blackPlayerImg}
      />
      <Timer timerId={player.timerId} color={player.color} />
    </div>
  );
}

function getPlayerDataClasses(isShowWhiteBottom = false) {
  const core = ['flex', 'w-full', 'justify-between', 'p-2', 'items-center'];
  const flipped = isShowWhiteBottom ? ['rotate-180'] : [];

  return [...core, ...flipped].join(' ');
}

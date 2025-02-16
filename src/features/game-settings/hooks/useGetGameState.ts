import { useAppSelector } from "base/features/game-board/hooks/useBoard";
import { useCastleRights } from "base/features/game-logic/hooks/useCastleRights";
import { selectPlayerById } from "base/redux/slices/player";

export function useGetGameState() {
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const gameSettings = useAppSelector((state) => state.gameSettings);
  const whitePlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.whitePlayerId));
  const blackPlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.blackPlayerId));
  const castleRights = useCastleRights();

  return { gameInfo, gameSettings, whitePlayer, blackPlayer, castleRights }
}

import { useDispatch } from 'react-redux';
import { GameSettings } from './useGameSettings';
import { selectPlayerById, setName } from '../redux/slices/player';
import { useAppSelector } from './useBoard';
import { getStartingTimeInSeconds } from '../helpers/notation-setup/game-setup/getStartingTimeInSeconds';
import { selectTimerById, setRemainingSeconds } from '../redux/slices/timer';
import { MatchResult, toggleIsPlaying } from '../redux/slices/gameInfo';
import { useEffect } from 'react';

export function useGameInfo() {
  const dispatch = useDispatch();
  const gameInfo = useAppSelector((state) => state.gameInfo);

  const whitePlayerId = gameInfo.whitePlayerId;
  const blackPlayerId = gameInfo.blackPlayerId;

  const whitePlayer = useAppSelector((state) => selectPlayerById(state, whitePlayerId));
  const blackPlayer = useAppSelector((state) => selectPlayerById(state, blackPlayerId));

  const whiteTimerId = whitePlayer?.timerId;
  const blackTimerId = blackPlayer?.timerId;

  const whiteTimer = useAppSelector((state) => selectTimerById(state, whiteTimerId));
  const blackTimer = useAppSelector((state) => selectTimerById(state, blackTimerId));

  const setupAndStartGame = (settings: GameSettings) => {
    dispatch(setName({ id: whitePlayerId, name: settings.whitePlayerName }));
    dispatch(setName({ id: blackPlayerId, name: settings.blackPlayerName }));

    const startingTimeInSeconds = getStartingTimeInSeconds(settings.timeControl);
    if (whiteTimer) {
      dispatch(setRemainingSeconds({ id: whiteTimerId, remainingSeconds: startingTimeInSeconds }));
    }
    if (blackTimer) {
      dispatch(setRemainingSeconds({ id: blackTimerId, remainingSeconds: startingTimeInSeconds }));
    }

    if (!gameInfo.isPlaying) dispatch(toggleIsPlaying());
  };

  useEffect(() => {
    if (gameInfo.matchResult !== null) {
      if (gameInfo.matchResult === MatchResult.DRAW) console.log('Game over, draw.');
      else console.log(`Game over! ${gameInfo.matchResult} has won.`);
    }
  }, [gameInfo.matchResult]);

  return { setupAndStartGame };
}

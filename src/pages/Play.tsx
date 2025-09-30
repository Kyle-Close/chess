
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Flex, Spinner, IconButton } from "@chakra-ui/react";
import { Board as BoardBase } from "base/features/game-board/components/Board";
import { CapturedBox } from "base/features/game-page/components/CapturedBox";
import { MoveHistoryBox } from "base/features/game-page/components/MoveHistoryBox";
import { PlayerBox } from "base/features/game-page/components/PlayerBox";
import { Flag, HandshakeIcon } from "lucide-react";
import { useGetActiveGame } from "base/features/api-utils/hooks/useGetActiveGame";
import { Color } from "base/zod/emums/Color";
import { DrawModal } from "base/features/game-page/components/DrawModal";
import { GameStatus } from "base/zod/emums/GameStatus";
import { ResignModal } from "base/features/game-page/components/ResignModal";
import { useSyncClock } from "base/features/api-utils/hooks/useSyncClock";

const Board = memo(BoardBase, (prev, next) => prev.game === next.game);

// Retry settings when local clock reaches <= 0 but server hasn't finalized yet
const SYNC_RETRY_MS = 1200;

export function Play() {
  const game = useGetActiveGame();
  const syncClockMutation = useSyncClock();

  // UI state
  const [isDrawModalOpen, setIsDrawModalOpen] = useState(false);
  const [isResignModalOpen, setIsResignModalOpen] = useState(false);

  // Player names (read once)
  const whiteName = useMemo(() => localStorage.getItem("whiteName") ?? "", []);
  const blackName = useMemo(() => localStorage.getItem("blackName") ?? "", []);

  // Clock state (seconds remaining) — updated only once per second to avoid jank
  const [whiteTimeSec, setWhiteTimeSec] = useState(0);
  const [blackTimeSec, setBlackTimeSec] = useState(0);

  // Which side’s clock is ticking right now
  const runningColorRef = useRef<Color | null>(null);

  // Anchors & timers
  const lastTickMsRef = useRef<number>(Date.now());
  const tickTimeoutRef = useRef<number | null>(null);       // setTimeout id
  const syncRetryIntervalRef = useRef<number | null>(null); // setInterval id

  // Helper
  const parseIsoMs = (s: string) => new Date(s.replace(/\.\d+/, "")).getTime();
  const hasData = !!game.data;

  // Clear helpers
  const clearTickTimeout = () => {
    if (tickTimeoutRef.current !== null) {
      clearTimeout(tickTimeoutRef.current);
      tickTimeoutRef.current = null;
    }
  };
  const clearSyncRetry = () => {
    if (syncRetryIntervalRef.current !== null) {
      clearInterval(syncRetryIntervalRef.current);
      syncRetryIntervalRef.current = null;
    }
  };

  // Align a setTimeout to the next whole-second boundary, then repeat
  const scheduleNextTick = () => {
    clearTickTimeout();
    const now = Date.now();
    const delay = 1000 - (now % 1000); // fire at next second boundary
    tickTimeoutRef.current = window.setTimeout(onTick, delay) as unknown as number;
  };

  // One "tick" reduces the active side by exactly 1s (if > 0), then reschedules
  const onTick = () => {
    const now = Date.now();

    // Pause ticking if no active game data
    if (!hasData || !game.data) {
      lastTickMsRef.current = now;
      scheduleNextTick();
      return;
    }

    const g = game.data;
    const isPlaying =
      g.status === GameStatus.ONGOING || g.status === GameStatus.IN_CHECK;

    if (!isPlaying) {
      // Game not playing: don't decrement; just reschedule (cheap keep-alive)
      lastTickMsRef.current = now;
      scheduleNextTick();
      return;
    }

    // Only mutate *one* clock per second: the side to move
    if (runningColorRef.current === Color.WHITE) {
      setWhiteTimeSec((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (runningColorRef.current === Color.BLACK) {
      setBlackTimeSec((prev) => (prev > 0 ? prev - 1 : 0));
    }

    lastTickMsRef.current = now;
    scheduleNextTick();
  };

  // Initialize/refresh local clocks whenever the server snapshot changes.
  // We compute the "as-of-now" remaining time by subtracting seconds since lastMoveTimeStamp
  // from the active side only.
  useEffect(() => {
    if (!hasData) return;

    const g = game.data!;
    runningColorRef.current = g.activeColor; // track whose turn it is

    // Stop any prior sync retry loop whenever we get fresh authoritative data
    clearSyncRetry();

    const isPlaying =
      g.status === GameStatus.ONGOING || g.status === GameStatus.IN_CHECK;

    if (!isPlaying) {
      // Freeze clocks exactly as reported
      setWhiteTimeSec(g.whiteRemainingTime);
      setBlackTimeSec(g.blackRemainingTime);
      lastTickMsRef.current = Date.now();
      return;
    }

    // Compute "as of now" remaining seconds for the active side
    const lastMoveMs = parseIsoMs(g.lastMoveTimeStamp);
    const nowMs = Date.now();
    const elapsed = Math.max(0, Math.floor((nowMs - lastMoveMs) / 1000));

    let whiteBase = g.whiteRemainingTime;
    let blackBase = g.blackRemainingTime;

    if (g.activeColor === Color.WHITE) {
      whiteBase = Math.max(0, whiteBase - elapsed);
    } else {
      blackBase = Math.max(0, blackBase - elapsed);
    }

    setWhiteTimeSec(whiteBase);
    setBlackTimeSec(blackBase);
    lastTickMsRef.current = nowMs;

    // Restart the 1Hz ticking loop aligned to the next second
    scheduleNextTick();

    // Also (re)start/stop ticking with page visibility to reduce background work
    const onVis = () => {
      if (document.hidden) {
        clearTickTimeout();
      } else {
        scheduleNextTick();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hasData,
    game.data?.id,
    game.data?.status,
    game.data?.activeColor,
    game.data?.lastMoveTimeStamp,
    game.data?.whiteRemainingTime,
    game.data?.blackRemainingTime,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTickTimeout();
      clearSyncRetry();
    };
  }, []);

  // If either local clock hits 0, keep pinging the server every SYNC_RETRY_MS
  // until server flips status OR new data arrives (which clears the interval above).
  useEffect(() => {
    if (!hasData || !game.data) return;

    const g = game.data;
    const isPlaying =
      g.status === GameStatus.ONGOING || g.status === GameStatus.IN_CHECK;

    if (!isPlaying) {
      clearSyncRetry();
      return;
    }

    const timeUp = whiteTimeSec <= 0 || blackTimeSec <= 0;

    if (timeUp) {
      if (syncRetryIntervalRef.current === null) {
        // Fire immediately once, then keep retrying on interval
        syncClockMutation.mutate({ gameId: g.id });
        syncRetryIntervalRef.current = window.setInterval(() => {
          if (!document.hidden && !syncClockMutation.isPending) {
            syncClockMutation.mutate({ gameId: g.id });
          }
        }, SYNC_RETRY_MS) as unknown as number;
      }
    } else {
      // If clocks are > 0 again (new game / correction), stop retrying
      clearSyncRetry();
    }
  }, [hasData, game.data, whiteTimeSec, blackTimeSec, syncClockMutation]);

  // Derived material values for UI
  const matValues = hasData
    ? calculatePlayerMaterialValues(
      game.data!.whiteMaterialValue,
      game.data!.blackMaterialValue
    )
    : { whiteMaterialValue: 0, blackMaterialValue: 0 };

  const handleOfferDrawClick = () => setIsDrawModalOpen(true);
  const handleResignClick = () => setIsResignModalOpen(true);

  if (!hasData) {
    return (
      <Flex h="100%" align="center" justify="center" p={8}>
        <Spinner mr={3} /> Loading game…
      </Flex>
    );
  }

  const g = game.data!;
  const isBlackTurn = g.activeColor === Color.BLACK;
  const isWhiteTurn = g.activeColor === Color.WHITE;

  return (
    <Flex justifyContent="center" alignItems="center">
      <Flex gap={8}>
        {/* Right side (Black) */}
        <Flex flexDir="column" gap={4}>
          <PlayerBox
            isTurn={isBlackTurn}
            materialDiff={matValues.blackMaterialValue}
            time={blackTimeSec}
            name={blackName}
          />
          <CapturedBox isWhite={false} capturedPieces={g.blackCapturedPieces} />
        </Flex>

        <Board game={g} />

        {/* Left side (White) */}
        <Flex flexDir="column" gap={4}>
          <PlayerBox
            isTurn={isWhiteTurn}
            materialDiff={matValues.whiteMaterialValue}
            time={whiteTimeSec}
            name={whiteName}
          />
          <CapturedBox isWhite={true} capturedPieces={g.whiteCapturedPieces} />
          <MoveHistoryBox moveHistory={g.moveHistory} />

          {isDrawModalOpen && (
            <DrawModal gameId={g.id} close={() => setIsDrawModalOpen(false)} />
          )}
          <IconButton
            onClick={handleOfferDrawClick}
            mt="auto"
            border="1px solid rgba(255, 255, 255, 0.3)"
          >
            <HandshakeIcon /> Offer Draw
          </IconButton>

          {isResignModalOpen && (
            <ResignModal
              gameId={g.id}
              resigningColor={g.activeColor}
              close={() => setIsResignModalOpen(false)}
            />
          )}
          <IconButton onClick={handleResignClick} bgColor="red.700">
            <Flag />
            Resign
          </IconButton>
        </Flex>
      </Flex>
    </Flex>
  );
}

function calculatePlayerMaterialValues(wMatVal: number, bMatVal: number) {
  const abs = Math.abs(wMatVal - bMatVal);
  if (wMatVal > bMatVal) return { whiteMaterialValue: abs, blackMaterialValue: -abs };
  return { whiteMaterialValue: -abs, blackMaterialValue: abs };
}


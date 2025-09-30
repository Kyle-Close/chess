
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

// How often the lightweight ticker runs (we only commit state when a full second elapses)
const TICK_MS = 250;
// Retry server sync cadence while a local clock is <= 0 and server hasn't finalized
const SYNC_RETRY_MS = 1200;

export function Play() {
  const game = useGetActiveGame();
  const syncClockMutation = useSyncClock();

  // UI state
  const [isDrawModalOpen, setIsDrawModalOpen] = useState(false);
  const [isResignModalOpen, setIsResignModalOpen] = useState(false);

  // Names (read once)
  const whiteName = useMemo(() => localStorage.getItem("whiteName") ?? "", []);
  const blackName = useMemo(() => localStorage.getItem("blackName") ?? "", []);

  // CLOCK STATE (in seconds) — this is what we render
  const [whiteTimeSec, setWhiteTimeSec] = useState(0);
  const [blackTimeSec, setBlackTimeSec] = useState(0);

  // REFS to avoid re-creating timers/effects: we update these frequently without causing rerenders
  const whiteRef = useRef(0);
  const blackRef = useRef(0);
  const runningColorRef = useRef<Color | null>(null); // whose clock should be ticking now
  const lastWholeSecondAnchorRef = useRef<number>(Date.now()); // ms anchor advanced in whole seconds
  const tickIntervalRef = useRef<number | null>(null);
  const syncRetryIntervalRef = useRef<number | null>(null);

  // Helpers
  const hasData = !!game.data;
  const parseIsoMs = (s: string) => new Date(s.replace(/\.\d+/, "")).getTime();

  // ---------- Initialize/refresh local clocks from server snapshot ----------
  useEffect(() => {
    if (!hasData) return;

    const g = game.data!;
    runningColorRef.current = g.activeColor;

    const isPlaying =
      g.status === GameStatus.ONGOING || g.status === GameStatus.IN_CHECK;

    // Compute "as-of-now" remaining seconds for the side to move (server timestamp based)
    const lastMoveMs = parseIsoMs(g.lastMoveTimeStamp);
    const nowMs = Date.now();
    const elapsed = Math.max(0, Math.floor((nowMs - lastMoveMs) / 1000));

    let whiteBase = g.whiteRemainingTime;
    let blackBase = g.blackRemainingTime;

    if (isPlaying) {
      if (g.activeColor === Color.WHITE) {
        whiteBase = Math.max(0, whiteBase - elapsed);
      } else {
        blackBase = Math.max(0, blackBase - elapsed);
      }
    }

    // Update refs first
    whiteRef.current = whiteBase;
    blackRef.current = blackBase;
    lastWholeSecondAnchorRef.current = nowMs;

    // Commit to state only if changed (reduces re-renders)
    setWhiteTimeSec((prev) => (prev !== whiteBase ? whiteBase : prev));
    setBlackTimeSec((prev) => (prev !== blackBase ? blackBase : prev));

    // Any time we get a fresh authoritative snapshot, stop the sync retry loop
    if (syncRetryIntervalRef.current !== null) {
      clearInterval(syncRetryIntervalRef.current);
      syncRetryIntervalRef.current = null;
    }
  }, [
    hasData,
    game.data?.id,
    game.data?.status,
    game.data?.activeColor,
    game.data?.lastMoveTimeStamp,
    game.data?.whiteRemainingTime,
    game.data?.blackRemainingTime,
  ]);

  // ---------- Lightweight ticker: single interval, mounted once ----------
  useEffect(() => {
    if (tickIntervalRef.current !== null) return; // already running

    tickIntervalRef.current = window.setInterval(() => {
      // Skip ticking if the tab is hidden to reduce work (we'll catch up next tick)
      if (document.hidden) return;
      // Need game data to know if we should tick
      if (!game.data) return;

      const g = game.data;
      const isPlaying =
        g.status === GameStatus.ONGOING || g.status === GameStatus.IN_CHECK;
      if (!isPlaying) return;

      // How many whole seconds passed since we last decremented a clock?
      const nowMs = Date.now();
      const elapsedSec = Math.floor(
        (nowMs - lastWholeSecondAnchorRef.current) / 1000
      );
      if (elapsedSec <= 0) return;

      // Decrement only the active side by the whole seconds elapsed
      if (runningColorRef.current === Color.WHITE) {
        const next = Math.max(0, whiteRef.current - elapsedSec);
        if (next !== whiteRef.current) {
          whiteRef.current = next;
          setWhiteTimeSec((prev) => (prev !== next ? next : prev));
        }
      } else if (runningColorRef.current === Color.BLACK) {
        const next = Math.max(0, blackRef.current - elapsedSec);
        if (next !== blackRef.current) {
          blackRef.current = next;
          setBlackTimeSec((prev) => (prev !== next ? next : prev));
        }
      }

      // Advance the anchor in WHOLE seconds to avoid accumulating drift
      lastWholeSecondAnchorRef.current += elapsedSec * 1000;
    }, TICK_MS) as unknown as number;

    // Cleanup on unmount
    return () => {
      if (tickIntervalRef.current !== null) {
        clearInterval(tickIntervalRef.current);
        tickIntervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount once

  // ---------- When our rendered clock state changes, check for timeout & sync ----------
  useEffect(() => {
    if (!hasData || !game.data) return;

    const g = game.data;
    const isPlaying =
      g.status === GameStatus.ONGOING || g.status === GameStatus.IN_CHECK;

    if (!isPlaying) {
      // Stop retry loop if game is finished
      if (syncRetryIntervalRef.current !== null) {
        clearInterval(syncRetryIntervalRef.current);
        syncRetryIntervalRef.current = null;
      }
      return;
    }

    const timeUp = whiteTimeSec <= 0 || blackTimeSec <= 0;

    if (!timeUp) {
      // Clocks recovered (new game/snapshot) -> stop retrying
      if (syncRetryIntervalRef.current !== null) {
        clearInterval(syncRetryIntervalRef.current);
        syncRetryIntervalRef.current = null;
      }
      return;
    }

    // Start a gentle retry loop if not already running.
    if (syncRetryIntervalRef.current === null) {
      // Fire once immediately (no await to keep UI snappy)
      if (!syncClockMutation.isPending) {
        syncClockMutation.mutate({ gameId: g.id });
      }
      // Then keep retrying while timeUp & game stays "playing". The loop is cleared
      // automatically by the above effect whenever we receive fresh server data or game ends.
      syncRetryIntervalRef.current = window.setInterval(() => {
        if (!document.hidden && !syncClockMutation.isPending) {
          syncClockMutation.mutate({ gameId: g.id });
        }
      }, SYNC_RETRY_MS) as unknown as number;
    }
  }, [hasData, game.data, whiteTimeSec, blackTimeSec, syncClockMutation]);

  // ---------- UI bits ----------
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
        {/* Black side */}
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

        {/* White side */}
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


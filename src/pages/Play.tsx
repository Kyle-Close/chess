
import { memo, useEffect, useRef, useState } from "react";
import { Box, Button, Flex, IconButton, Spinner, Text } from "@chakra-ui/react";
import { Board as BoardBase } from "base/features/game-board/components/Board";
import { MoveHistoryBox } from "base/features/game-page/components/MoveHistoryBox";
import { PlayerStrip } from "base/features/game-page/components/PlayerStrip";
import { Bot, Flag, Handshake, Home, Plus, RefreshCcw, Users, Volume2, VolumeX } from "lucide-react";
import { Tooltip } from "base/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { useGetActiveGame } from "base/features/api-utils/hooks/useGetActiveGame";
import { Color } from "base/zod/emums/Color";
import { DrawModal } from "base/features/game-page/components/DrawModal";
import { GameStatus } from "base/zod/emums/GameStatus";
import { ResignModal } from "base/features/game-page/components/ResignModal";
import { useSyncClock } from "base/features/api-utils/hooks/useSyncClock";
import { Game } from "base/zod/GameSchema";
import { GameType } from "base/zod/emums/GameType";
import { getDefaultFlipped, getGameOverReason, getHumanColor, isDrawStatus, isGamePlaying, opposite } from "base/features/game-board/utils/gameState";
import { getPlayerName, getStrengthTier, TIME_CONTROLS } from "base/features/game-page/utils/players";
import { setSoundEnabled, useSoundEnabled } from "base/features/game-board/utils/sounds";

const Board = memo(BoardBase);

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

  const navigate = useNavigate();
  const soundEnabled = useSoundEnabled();
  const [userFlipped, setUserFlipped] = useState(false);

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
    if (!hasData || game.data.stockfishInfo !== null) return;

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
    if (tickIntervalRef.current !== null || game.data?.stockfishInfo !== null) return; // already running

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
    if (!hasData || !game.data || game.data.stockfishInfo !== null) return;

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

  if (!hasData) {
    return (
      <Flex flex={1} align="center" justify="center" p={8}>
        {game.isError || !game.isFetching ? (
          <Flex direction="column" align="center" gap={4} textAlign="center" maxW="sm">
            <Text fontFamily="heading" fontSize="2xl">This game couldn't be loaded</Text>
            <Text color="fg.muted">It may have expired, or the server is unreachable right now.</Text>
            <Button colorPalette="gold" onClick={() => navigate("/")}>Back to home</Button>
          </Flex>
        ) : (
          <Flex align="center" gap={3} color="fg.muted"><Spinner size="sm" /> Loading game…</Flex>
        )}
      </Flex>
    );
  }

  const g = game.data!;
  const isPlaying = isGamePlaying(g);
  const humanColor = getHumanColor(g);
  const flipped = getDefaultFlipped(g) !== userFlipped;
  const bottomColor = flipped ? Color.BLACK : Color.WHITE;
  const topColor = opposite(bottomColor);
  const isEngineGame = g.type === GameType.STOCKFISH && !!g.stockfishInfo;

  const stripProps = (color: Color) => {
    const isEngine = isEngineGame && g.stockfishInfo!.playingAs === color;
    return {
      name: getPlayerName(g, color),
      subtitle: isEngine ? `Level ${g.stockfishInfo!.strength}` : undefined,
      color,
      capturedPieces: color === Color.WHITE ? g.whiteCapturedPieces : g.blackCapturedPieces,
      materialAdvantage: color === Color.WHITE ? matValues.whiteMaterialValue : matValues.blackMaterialValue,
      isTurn: isPlaying && g.activeColor === color,
      clock: isEngineGame ? null : color === Color.WHITE ? whiteTimeSec : blackTimeSec,
      isThinking: isEngine && isPlaying && g.activeColor === color,
    };
  };

  // Against the engine you always resign/offer as yourself; in pass-and-play it's whoever is to move
  const actingColor = humanColor ?? g.activeColor;
  const actingName = getPlayerName(g, actingColor);

  return (
    <Flex className="play-layout" flex={1} justify="center" align={{ base: "stretch", lg: "center" }} px={{ base: 3, lg: 8 }} py={{ base: 3, lg: 6 }}>
      <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 4, lg: 7 }} align={{ base: "center", lg: "stretch" }}>
        <Flex className="play-board-col" direction="column" gap={2}>
          <PlayerStrip {...stripProps(topColor)} />
          <Board game={g} flipped={flipped} />
          <PlayerStrip {...stripProps(bottomColor)} />
        </Flex>

        <Flex
          as="aside"
          direction="column"
          w={{ base: "var(--board-size)", lg: "340px" }}
          maxH={{ lg: "calc(var(--board-size) + 120px)" }}
          bg="ink.900"
          border="1px solid"
          borderColor="border"
          borderRadius="2xl"
          overflow="hidden"
        >
          <GameHeader game={g} />
          <MoveHistoryBox moveHistory={g.moveHistory} />

          <Flex direction="column" gap={3} p={4} borderTop="1px solid" borderColor="border" bg="ink.850">
            <Flex gap={2}>
              <Tooltip content="Flip board" openDelay={300}>
                <IconButton aria-label="Flip board" variant="outline" borderColor="border.emphasized" onClick={() => setUserFlipped((f) => !f)}>
                  <RefreshCcw />
                </IconButton>
              </Tooltip>
              <Tooltip content={soundEnabled ? "Mute sounds" : "Unmute sounds"} openDelay={300}>
                <IconButton aria-label={soundEnabled ? "Mute sounds" : "Unmute sounds"} variant="outline" borderColor="border.emphasized" onClick={() => setSoundEnabled(!soundEnabled)}>
                  {soundEnabled ? <Volume2 /> : <VolumeX />}
                </IconButton>
              </Tooltip>
              {isPlaying ? (
                <>
                  <Button flex={1} variant="outline" borderColor="border.emphasized" onClick={() => setIsDrawModalOpen(true)}>
                    <Handshake /> Draw
                  </Button>
                  <Button flex={1} variant="outline" borderColor="rgba(229, 115, 107, 0.4)" color="#f0948c" _hover={{ bg: "rgba(229, 115, 107, 0.12)" }} onClick={() => setIsResignModalOpen(true)}>
                    <Flag /> Resign
                  </Button>
                </>
              ) : (
                <>
                  <IconButton aria-label="Home" variant="outline" borderColor="border.emphasized" onClick={() => navigate("/")}>
                    <Home />
                  </IconButton>
                  <Button flex={1} colorPalette="gold" fontWeight="semibold" onClick={() => navigate(isEngineGame ? "/configure/stockfish" : "/configure/local")}>
                    <Plus /> New game
                  </Button>
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      {isDrawModalOpen && (
        <DrawModal
          gameId={g.id}
          offeredBy={actingName}
          offeredTo={humanColor === null ? getPlayerName(g, opposite(actingColor)) : null}
          close={() => setIsDrawModalOpen(false)}
        />
      )}
      {isResignModalOpen && (
        <ResignModal
          gameId={g.id}
          resigningColor={actingColor}
          resigningName={actingName}
          close={() => setIsResignModalOpen(false)}
        />
      )}
    </Flex>
  );
}

function GameHeader({ game }: { game: Game }) {
  const isEngineGame = game.type === GameType.STOCKFISH && !!game.stockfishInfo;
  const isPlaying = isGamePlaying(game);

  let detail: string;
  if (isEngineGame) {
    detail = `Level ${game.stockfishInfo!.strength} · ${getStrengthTier(game.stockfishInfo!.strength).label}`;
  } else {
    const tc = TIME_CONTROLS.find((t) => t.value === localStorage.getItem("timeControl"));
    detail = tc ? `${tc.name} · ${tc.minutes} min` : "Timed game";
  }

  let status: React.ReactNode;
  if (isPlaying) {
    const toMove = getPlayerName(game, game.activeColor);
    const inCheck = game.status === GameStatus.IN_CHECK;
    const text = isEngineGame
      ? game.activeColor === game.stockfishInfo!.playingAs ? "Stockfish is thinking" : "Your move"
      : `${toMove} to move`;
    status = (
      <Flex align="center" gap={2.5}>
        <Box w="10px" h="10px" borderRadius="full" border="1px solid" borderColor="whiteAlpha.400" bg={game.activeColor === Color.WHITE ? "#ece6da" : "#15171b"} />
        <Text fontWeight="semibold">{text}</Text>
        {inCheck && <Text as="span" fontSize="xs" fontWeight="bold" color="#f0948c" bg="rgba(229, 115, 107, 0.14)" px={2} py={0.5} borderRadius="full">CHECK</Text>}
      </Flex>
    );
  } else {
    const result = isDrawStatus(game.status)
      ? "Game drawn"
      : game.winner !== null ? `${getPlayerName(game, game.winner)} ${getPlayerName(game, game.winner) === "You" ? "won" : "wins"}` : "Game over";
    status = (
      <Flex align="baseline" gap={2} wrap="wrap">
        <Text fontWeight="semibold" color="gold.300">{result}</Text>
        <Text fontSize="sm" color="fg.muted">· {getGameOverReason(game.status)}</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap={3} px={5} pt={5} pb={4} borderBottom="1px solid" borderColor="border">
      <Flex align="center" gap={2} color="fg.muted" fontSize="sm">
        {isEngineGame ? <Bot size={16} /> : <Users size={16} />}
        <Text fontWeight="medium" color="fg">{isEngineGame ? "vs Stockfish" : "Pass & play"}</Text>
        <Text>·</Text>
        <Text>{detail}</Text>
      </Flex>
      {status}
    </Flex>
  );
}

function calculatePlayerMaterialValues(wMatVal: number, bMatVal: number) {
  const abs = Math.abs(wMatVal - bMatVal);
  if (wMatVal > bMatVal) return { whiteMaterialValue: abs, blackMaterialValue: -abs };
  return { whiteMaterialValue: -abs, blackMaterialValue: abs };
}

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

const Board = memo(BoardBase, (prev, next) => prev.game === next.game);

type Anchor = {
  syncedAt: number;            // when we last synced from server
  activeColorAtSync: Color;    // whose clock was running at sync
  whiteBaseSec: number;        // remaining sec at sync
  blackBaseSec: number;
};

export function Play() {
  const game = useGetActiveGame();

  // UI state (always call hooks, never behind conditionals)
  const [isDrawModalOpen, setIsDrawModalOpen] = useState(false);
  const [isResignModalOpen, setIsResignModalOpen] = useState(false);

  // Names (read once)
  const whiteName = useMemo(() => localStorage.getItem("whiteName") ?? "", []);
  const blackName = useMemo(() => localStorage.getItem("blackName") ?? "", []);

  // Anchor for time derivation
  const anchor = useRef<Anchor | null>(null);

  const parseIsoMs = (s: string) => new Date(s.replace(/\.\d+/, "")).getTime();

  // Ticker: single state that updates on an interval
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, []);

  const hasData = !!game.data;

  // Recompute bases whenever the server snapshot changes
  useEffect(() => {
    if (!hasData) return;

    const g = game.data!;
    const isPlaying =
      g.status === GameStatus.ONGOING || g.status === GameStatus.IN_CHECK;
    if (!isPlaying) {
      // stop clocks: anchor still useful, but we can just freeze bases as-is
      anchor.current = {
        syncedAt: Date.now(),
        activeColorAtSync: g.activeColor,
        whiteBaseSec: g.whiteRemainingTime,
        blackBaseSec: g.blackRemainingTime,
      };
      return;
    }

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

    anchor.current = {
      syncedAt: nowMs,
      activeColorAtSync: g.activeColor,
      whiteBaseSec: whiteBase,
      blackBaseSec: blackBase,
    };
  }, [
    hasData,
    game.data?.id,
    game.data?.status,
    game.data?.activeColor,
    game.data?.lastMoveTimeStamp,
    game.data?.whiteRemainingTime,
    game.data?.blackRemainingTime,
  ]);

  // Derive remaining times from anchor + now
  let whiteTime = 0;
  let blackTime = 0;
  const a = anchor.current;
  if (a) {
    const elapsed = Math.max(0, Math.floor((now - a.syncedAt) / 1000));
    if (a.activeColorAtSync === Color.WHITE) {
      whiteTime = Math.max(0, a.whiteBaseSec - elapsed);
      blackTime = a.blackBaseSec;
    } else {
      blackTime = Math.max(0, a.blackBaseSec - elapsed);
      whiteTime = a.whiteBaseSec;
    }
  }

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
        <Flex flexDir="column" gap={4}>
          <PlayerBox
            isTurn={isBlackTurn}
            materialDiff={matValues.blackMaterialValue}
            time={blackTime}
            name={blackName}
          />
          <CapturedBox isWhite={false} capturedPieces={g.blackCapturedPieces} />
        </Flex>

        <Board game={g} />

        <Flex flexDir="column" gap={4}>
          <PlayerBox
            isTurn={isWhiteTurn}
            materialDiff={matValues.whiteMaterialValue}
            time={whiteTime}
            name={whiteName}
          />
          <CapturedBox isWhite={true} capturedPieces={g.whiteCapturedPieces} />
          <MoveHistoryBox moveHistory={g.moveHistory} />

          {isDrawModalOpen && (
            <DrawModal gameId={g.id} close={() => setIsDrawModalOpen(false)} />
          )}
          <IconButton onClick={handleOfferDrawClick} mt="auto" border="1px solid rgba(255, 255, 255, 0.3)"> <HandshakeIcon /> Offer Draw </IconButton>

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


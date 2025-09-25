import { memo, useEffect, useRef, useState } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { Board as BoardBase } from "base/features/game-board/components/Board";
import { CapturedBox } from "base/features/game-page/components/CapturedBox";
import { MoveHistoryBox } from "base/features/game-page/components/MoveHistoryBox";
import { PlayerBox } from "base/features/game-page/components/PlayerBox";
import { Flag, HandshakeIcon } from "lucide-react";
import { useGetActiveGame } from "base/features/api-utils/hooks/useGetActiveGame";
import { Color } from "base/zod/emums/Color";

const Board = memo(BoardBase, (prev, next) => prev.game === next.game); // prevent timer ticks from re-rendering the board

export function Play() {
  const game = useGetActiveGame();
  if (!game.data) return null;

  const whiteName = localStorage.getItem('whiteName')
  const blackName = localStorage.getItem('blackName')

  // anchor with bases computed from server snapshot + lastMoveTimeStamp
  const anchor = useRef<{
    syncedAt: number;
    activeColorAtSync: Color;
    whiteBaseSec: number;
    blackBaseSec: number;
  } | null>(null);

  const parseIsoMs = (s: string) => new Date(s.replace(/\.\d+/, "")).getTime();

  // recompute bases whenever server data changes (new move/new game/refetch)
  useEffect(() => {
    const g = game.data!;
    const lastMoveMs = parseIsoMs(g.lastMoveTimeStamp);
    const nowMs = Date.now();
    const elapsed = Math.max(0, Math.floor((nowMs - lastMoveMs) / 1000));

    let whiteBase = g.whiteRemainingTime;
    let blackBase = g.blackRemainingTime;
    if (g.activeColor === Color.WHITE) whiteBase = Math.max(0, whiteBase - elapsed);
    else blackBase = Math.max(0, blackBase - elapsed);

    anchor.current = {
      syncedAt: nowMs,
      activeColorAtSync: g.activeColor,
      whiteBaseSec: whiteBase,
      blackBaseSec: blackBase,
    };
  }, [
    game.data?.id,
    game.data?.activeColor,
    game.data?.lastMoveTimeStamp,
    game.data?.whiteRemainingTime,
    game.data?.blackRemainingTime,
  ]);

  // a single lightweight ticker; only this state updates every frame
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, []);

  // derive remaining times from anchor + now (no extra state updates)
  let whiteTime = 0, blackTime = 0;
  const a = anchor.current;
  if (a) {
    const elapsed = Math.floor((now - a.syncedAt) / 1000);
    if (a.activeColorAtSync === Color.WHITE) {
      whiteTime = Math.max(0, a.whiteBaseSec - elapsed);
      blackTime = a.blackBaseSec;
    } else {
      blackTime = Math.max(0, a.blackBaseSec - elapsed);
      whiteTime = a.whiteBaseSec;
    }
  }

  const matValues = calculatePlayerMaterialValues(
    game.data.whiteMaterialValue,
    game.data.blackMaterialValue
  );

  return (
    <Flex justifyContent="center" alignItems="center">
      <Flex gap={8}>
        <Flex flexDir="column" gap={4}>
          <PlayerBox
            isTurn={game.data.activeColor === Color.BLACK}
            materialDiff={matValues.blackMaterialValue}
            time={blackTime}
            name={blackName ?? ""}
          />
          <CapturedBox isWhite={false} capturedPieces={game.data.blackCapturedPieces} />
        </Flex>

        <Board game={game.data} /> {/* memoized; won’t re-render on every tick */}

        <Flex flexDir="column" gap={4}>
          <PlayerBox
            isTurn={game.data.activeColor === Color.WHITE}
            materialDiff={matValues.whiteMaterialValue}
            time={whiteTime}
            name={whiteName ?? ""}
          />
          <CapturedBox isWhite={true} capturedPieces={game.data.whiteCapturedPieces} />
          <MoveHistoryBox moveHistory={game.data.moveHistory} />
          <IconButton mt="auto" border="1px solid rgba(255, 255, 255, 0.3)">
            <HandshakeIcon />
            Offer Draw
          </IconButton>
          <IconButton bgColor="red.700">
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



import { Flex, IconButton } from "@chakra-ui/react";
import { Board } from "base/features/game-board/components/Board";
import { CapturedBox } from "base/features/game-page/components/CapturedBox";
import { MoveHistoryBox } from "base/features/game-page/components/MoveHistoryBox";
import { PlayerBox } from "base/features/game-page/components/PlayerBox";
import { Flag, HandshakeIcon } from "lucide-react";
import { useGetActiveGame } from "base/features/api-utils/hooks/useGetActiveGame";
import { Color } from "base/zod/emums/Color";
import { useEffect, useRef, useState } from "react";

export function Play() {
  const game = useGetActiveGame();

  const [whiteTime, setWhiteTime] = useState(0);
  const [blackTime, setBlackTime] = useState(0);

  // anchor that survives interval closures
  const anchor = useRef<{
    syncedAt: number;           // when we set these bases on the client
    activeColorAtSync: Color;
    whiteBaseSec: number;       // remaining sec at syncedAt
    blackBaseSec: number;
  } | null>(null);

  // Parse .NET ISO with 7 fractional digits reliably
  const parseIsoMs = (s: string) => new Date(s.replace(/\.\d+/, "")).getTime();

  // Whenever server data changes (new move, new game, or focus refetch),
  // recompute the base remaining times from lastMoveTimeStamp.
  useEffect(() => {
    if (!game.data) return;

    const {
      whiteRemainingTime, // seconds (snapshot at server send)
      blackRemainingTime,
      activeColor,
      lastMoveTimeStamp,
    } = game.data;

    const serverLastMoveMs = parseIsoMs(lastMoveTimeStamp); // when current turn started
    const nowMs = Date.now();
    const elapsedSinceLastMoveSec = Math.max(
      0,
      Math.floor((nowMs - serverLastMoveMs) / 1000)
    );

    // Adjust the side to move by elapsed since the last move
    let whiteBaseSec = whiteRemainingTime;
    let blackBaseSec = blackRemainingTime;
    if (activeColor === Color.WHITE) {
      whiteBaseSec = Math.max(0, whiteRemainingTime - elapsedSinceLastMoveSec);
    } else {
      blackBaseSec = Math.max(0, blackRemainingTime - elapsedSinceLastMoveSec);
    }

    anchor.current = {
      syncedAt: nowMs,
      activeColorAtSync: activeColor,
      whiteBaseSec,
      blackBaseSec,
    };

    // set immediate UI
    setWhiteTime(whiteBaseSec);
    setBlackTime(blackBaseSec);
  }, [
    game.data?.id,                 // new game
    game.data?.activeColor,        // turn changed
    game.data?.lastMoveTimeStamp,  // new move
    game.data?.whiteRemainingTime,
    game.data?.blackRemainingTime,
  ]);

  // Local ticker derived from the anchor (no reliance on server snapshots)
  useEffect(() => {
    const id = setInterval(() => {
      const a = anchor.current;
      if (!a) return;

      const elapsedSinceSyncSec = Math.floor((Date.now() - a.syncedAt) / 1000);

      if (a.activeColorAtSync === Color.WHITE) {
        setWhiteTime(Math.max(0, a.whiteBaseSec - elapsedSinceSyncSec));
        setBlackTime(a.blackBaseSec); // frozen
      } else {
        setBlackTime(Math.max(0, a.blackBaseSec - elapsedSinceSyncSec));
        setWhiteTime(a.whiteBaseSec); // frozen
      }
    }, 250);
    return () => clearInterval(id);
  }, []);

  if (!game.data) return null;

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
          />
          <CapturedBox isWhite={false} />
        </Flex>
        <Board game={game.data} />
        <Flex flexDir="column" gap={4}>
          <PlayerBox
            isTurn={game.data.activeColor === Color.WHITE}
            materialDiff={matValues.whiteMaterialValue}
            time={whiteTime}
          />
          <CapturedBox isWhite={true} />
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
  if (wMatVal > bMatVal) {
    return { whiteMaterialValue: abs, blackMaterialValue: abs * -1 };
  }
  return { whiteMaterialValue: abs * -1, blackMaterialValue: abs };
}


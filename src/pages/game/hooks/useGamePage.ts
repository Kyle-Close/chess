import { useEffect, useState } from "react";
import { selectPlayerById } from "base/redux/slices/player";
import { MatchResult } from "base/redux/slices/gameInfo";
import { useAppDispatch, useAppSelector } from "base/features/game-board/hooks/useBoard";
import { setIsOn } from "base/redux/slices/timer";
import { socket } from "base/utils/socket";
import { DEFAULT_FEN_STRING } from "base/data/defaultFen";


export function useGamePage() {
  const dispatch = useAppDispatch();
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const whitePlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.whitePlayerId));
  const blackPlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.blackPlayerId));
  const [showModal, setShowModal] = useState(gameInfo.matchResult !== MatchResult.ONGOING);

  useEffect(() => {
    if (gameInfo.matchResult !== MatchResult.ONGOING) setShowModal(true);
  }, [gameInfo.matchResult]);

  useEffect(() => {
    if (!gameInfo.isPlaying) {
      dispatch(setIsOn({ id: whitePlayer.id, isOn: false }));
      dispatch(setIsOn({ id: blackPlayer.id, isOn: false }));
    }

    if (whitePlayer.isTurn) {
      dispatch(setIsOn({ id: whitePlayer.id, isOn: true }));
      dispatch(setIsOn({ id: blackPlayer.id, isOn: false }));
    } else {
      dispatch(setIsOn({ id: whitePlayer.id, isOn: false }));
      dispatch(setIsOn({ id: blackPlayer.id, isOn: true }));
    }
  }, [gameInfo.isPlaying, whitePlayer.id, blackPlayer.id, whitePlayer.isTurn, blackPlayer.isTurn, dispatch]);

  useEffect(() => {
    if (whitePlayer.isTurn && whitePlayer.isAi) {
      socket.emit('evaluate', DEFAULT_FEN_STRING)
    } else if (blackPlayer.isTurn && blackPlayer.isAi) {
      socket.emit('evaluate', DEFAULT_FEN_STRING)
    }
  }, [whitePlayer.isTurn, whitePlayer.isAi, blackPlayer.isTurn, blackPlayer.isAi, dispatch])

  if (!gameInfo.whitePlayerId || !gameInfo.blackPlayerId) return null

  const showPromotion = gameInfo.pawnPromotionSquare !== null;
  const whiteMaterialDiff = whitePlayer.remainingMaterialValue - blackPlayer.remainingMaterialValue;
  const blackMaterialDiff = blackPlayer.remainingMaterialValue - whitePlayer.remainingMaterialValue;

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  return { blackMaterialDiff, closeModal, openModal, showPromotion, whiteMaterialDiff, showModal, gameInfo };
}



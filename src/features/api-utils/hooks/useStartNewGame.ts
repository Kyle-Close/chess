import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Game, GameSchema } from "base/zod/GameSchema";
import { TimeControlType } from "base/zod/emums/TimeControl";
import { useNavigate } from "react-router-dom";

export function useStartNewGame() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const gameMutation = useMutation({
    mutationFn: startNewGame,
    mutationKey: ["game"],
    onSuccess: (gameData) => {
      localStorage.setItem('gameId', gameData.id);
      queryClient.setQueryData(["game", gameData.id], gameData)
      navigate(`/play/${gameData.id}`)
    },
    onError: (err) => {
      console.error("startNewGame failed:", err);
    },
  });

  return gameMutation;
}

interface StartNewGameParams {
  timeControlType: TimeControlType,
  fen?: string,
  stockfishStrength?: number,
  stockfishColor?: number
}

async function startNewGame({ timeControlType, fen, stockfishStrength, stockfishColor }: StartNewGameParams): Promise<Game> {
  const payload: StartNewGameParams = { timeControlType };

  if (fen && fen.trim() !== "") {
    payload.fen = fen;
  }

  if (stockfishStrength !== null) {

    payload.stockfishStrength = stockfishStrength;
  }

  if (stockfishColor !== null) {
    payload.stockfishColor = stockfishColor;
  }

  const response = await fetch("http://localhost:5165/chess-api/start-game", {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // ← always set
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("Could not start new game.");

  const json = await response.json();
  return GameSchema.parse(json);
}


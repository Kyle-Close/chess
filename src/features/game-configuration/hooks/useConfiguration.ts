import { SubmitHandler, useForm } from "react-hook-form";
import { usePlayers } from "./usePlayers";
import { TimeControlType } from "base/zod/emums/TimeControl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Game, GameSchema } from "base/zod/GameSchema";
import { useNavigate } from "react-router-dom";

export type LocalConfigurationFormInputs = {
  player1Name: string,
  player2Name: string,
  player1Color: string,
  timeControl: string,
  fen?: string
}


export function useConfiguration() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const gameMutation = useMutation({
    mutationFn: startNewGame,
    mutationKey: ["game"],
    onSuccess: (gameData) => {
      queryClient.setQueryData(["game"], gameData)
    }
  });

  const localConfigurationFormInputs = useForm<LocalConfigurationFormInputs>();
  const onSubmit: SubmitHandler<LocalConfigurationFormInputs> = data => handleSubmit(data);
  const { getRandomName } = usePlayers();

  const handleSubmit = (data: LocalConfigurationFormInputs) => {
    gameMutation.mutate({ timeControl: data.timeControl, fen: data.fen });
    navigate("/play")
  }

  return {
    localConfigurationFormInputs,
    onSubmit,
    getRandomName
  }
}

interface StartNewGameParams {
  timeControl: string,
  fen?: string
}

async function startNewGame(params: StartNewGameParams): Promise<Game> {
  const timeControlType = getTimeControlType(params.timeControl);

  // Build a plain object, then stringify once
  const payload: any = { timeControlType };
  if (params.fen && params.fen.trim() !== "") {
    payload.fen = params.fen;
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

function getTimeControlType(timeControl: string) {
  switch (timeControl) {
    case "0":
      return TimeControlType.CLASSICAL;
    case "1":
      return TimeControlType.RAPID;
    case "2":
      return TimeControlType.BLITZ;
    case "3":
      return TimeControlType.BULLET;
  }
}

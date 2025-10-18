import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form"
import { Game, GameSchema } from "../../../zod/GameSchema";
import { useEffect } from "react";
import { BASE_URL } from "base/features/api-utils/baseUrl";

type FormInputs = {
  fen: string
}

export function useChessApi() {
  const form = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => gameMutation.mutate(data.fen);

  const queryClient = useQueryClient()
  const gameMutation = useMutation({
    mutationFn: startNewGame,
    mutationKey: ["game"],
    onSuccess: (gameData) => {
      queryClient.setQueryData(["game"], gameData)
    }
  });


  const gameData = useQuery<Game>({
    queryKey: ['game'],
    queryFn: async () => {
      const cached = queryClient.getQueryData<Game>(['game']);
      if (!cached) throw new Error('No game in cache');
      return cached;
    },
    initialData: () => queryClient.getQueryData<Game>(['game']),
    enabled: true
  }).data;


  useEffect(() => {
    gameMutation.mutate("");
  }, [])

  return {
    form,
    onSubmit,
    gameMutation,
    gameData
  }
}

const startNewGame = async (fen?: string): Promise<Game> => {

  try {
    const response = await fetch(`${BASE_URL}/chess-api/start-game`, {
      method: "POST",
      body: fen ? JSON.stringify({ fen }) : undefined,
      headers: fen ? { "Content-Type": "application/json" } : undefined,
    });

    if (!response.ok) {
      throw new Error("Could not start new game.");
    }

    const jsonData = await response.json();
    const res = GameSchema.parse(jsonData);

    return res;
  } catch (err) {
    console.error('Error starting new game:', err);
    throw err;
  }
};

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Game, GameSchema } from "base/zod/GameSchema";
import { BASE_URL } from "../baseUrl";

export function useGetActiveGame() {
  const queryClient = useQueryClient();
  const gameId = localStorage.getItem("gameId");

  const gameQuery = useQuery<Game>({
    queryKey: ['game', gameId],
    queryFn: () => fetchGame(gameId!),     // real server fetch by id
    enabled: !!gameId,                     // only run when we have an id
    initialData: () => queryClient.getQueryData(['game', gameId]),
  });

  return gameQuery
}

async function fetchGame(gameId: string) {
  const path = 'game';
  const queryKey = 'gameId'
  const queryValue = gameId;

  try {
    const response = await fetch(`${BASE_URL}/${path}?${queryKey}=${queryValue}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const jsonData = await response.json();
    return GameSchema.parse(jsonData);
  } catch (err) {
    console.error(err);
    throw err;
  }

}

import { Player, createPlayer } from "base/redux/slices/player";

export function useCreatePlayer(player: Player) {
  return createPlayer(player)
}

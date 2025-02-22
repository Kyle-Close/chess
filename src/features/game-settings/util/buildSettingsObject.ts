
import { GameSettings, GameType } from "base/redux/slices/gameSettings";
import { GameSetup } from "../hooks/useGameSettings";

export function buildSettingsObject(gameType: GameType, data: GameSetup): GameSettings {
  return {
    gameType: gameType,
    timeControl: data.selectedTimeControl,
    isIncrement: data.isIncrement,
    isUndoRedo: data.isUndoRedo,
    isFiftyMoveRule: data.isFiftyMoveRule,
    stockfishElo: data.stockfishElo ? Number(data.stockfishElo) : 0
  }
}

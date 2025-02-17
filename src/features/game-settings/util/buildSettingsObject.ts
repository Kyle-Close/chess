
import { GameSettings, GameType } from "base/redux/slices/gameSettings";
import { GameSetup } from "../hooks/useGameSettings";

export function buildSettingsObject(data: GameSetup): GameSettings {
  return {
    gameType: GameType.LOCAL,
    timeControl: data.selectedTimeControl,
    isIncrement: data.isIncrement,
    isUndoRedo: data.isUndoRedo,
    isFiftyMoveRule: data.isFiftyMoveRule,
    stockfishElo: data.stockfishElo ? Number(data.stockfishElo) : 0
  }
}

import { GameSettings, GameType } from "base/redux/slices/gameSettings";
import { LocalGameSetupFormInputs } from "../hooks/useGameSettings";

export function buildSettingsObject(data: LocalGameSetupFormInputs): GameSettings {
  return {
    gameType: GameType.LOCAL,
    timeControl: data.selectedTimeControl,
    isIncrement: data.isIncrement,
    isUndoRedo: data.isUndoRedo,
    isFiftyMoveRule: data.isFiftyMoveRule,
    stockfishElo: 0
  };
}

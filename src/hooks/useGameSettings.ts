import { useState } from 'react';

export enum GameType {
  LOCAL,
  COMPUTER,
  ONLINE,
}

export enum TimeControl {
  FREE_PLAY = 'FREE PLAY',
  BLITZ = 'BLITZ',
  RAPID = 'RAPID',
  CLASSICAL = 'CLASSICAL',
}

export interface UseGameSettingsReturn {
  whitePlayerName: string;
  updateWhitePlayerName: (name: string) => void;
  blackPlayerName: string;
  updateBlackPlayerName: (name: string) => void;
  gameType: GameType;
  updateGameType: (gameType: GameType) => void;
  timeControl: TimeControl;
  updateTimeControl: (timeControl: TimeControl) => void;
  isIncrement: boolean;
  updateIsIncrement: (isIncrement: boolean) => void;
  isUndoRedo: boolean;
  updateIsUndoRedo: (isUndoRedo: boolean) => void;
  isFiftyMoveRule: boolean;
  updateIsFiftyMoveRule: (isFiftyMoveRule: boolean) => void;
}

export function useGameSettings(): UseGameSettingsReturn {
  const [whitePlayerName, setWhitePlayerName] = useState('WHITE');
  const [blackPlayerName, setBlackPlayerName] = useState('BLACK');

  const [gameType, setGameType] = useState(GameType.LOCAL);
  const [timeControl, setTimeControl] = useState(TimeControl.RAPID);
  const [isIncrement, setIsIncrement] = useState(false);
  const [isUndoRedo, setIsUndoRedo] = useState(false);
  const [isFiftyMoveRule, setIsFiftyMoveRule] = useState(true);

  const updateGameType = (gameType: GameType) => {
    setGameType(gameType);
  };

  const updateWhitePlayerName = (name: string) => {
    setWhitePlayerName(name);
  };

  const updateBlackPlayerName = (name: string) => {
    setBlackPlayerName(name);
  };

  const updateTimeControl = (timeControl: TimeControl) => {
    setTimeControl(timeControl);
  };

  const updateIsIncrement = (isIncrement: boolean) => {
    setIsIncrement(isIncrement);
  };

  const updateIsUndoRedo = (isUndoRedo: boolean) => {
    setIsUndoRedo(isUndoRedo);
  };

  const updateIsFiftyMoveRule = (isFiftyMoveRule: boolean) => {
    setIsFiftyMoveRule(isFiftyMoveRule);
  };

  return {
    gameType,
    updateGameType,
    whitePlayerName,
    updateWhitePlayerName,
    blackPlayerName,
    updateBlackPlayerName,
    timeControl,
    updateTimeControl,
    isIncrement,
    updateIsIncrement,
    isUndoRedo,
    updateIsUndoRedo,
    isFiftyMoveRule,
    updateIsFiftyMoveRule,
  };
}

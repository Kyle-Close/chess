import { useState } from 'react';
import { TimeControl } from './useGameSettings';
import { PieceColor } from '../enums/PieceColor';

export interface UseLocalSetupReturn {
  whiteName: string;
  blackName: string;
  handleNameUpdate: (color: PieceColor, value: string) => void;
  selectedTimeControl: TimeControl;
  updateSelectedTimeControl: (timeControl: TimeControl) => void;
  isIncrement: boolean;
  updateIsIncrement: (isIncrement: boolean) => void;
  isUndoRedo: boolean;
  updateIsUndoRedo: (isUndoRedo: boolean) => void;
  isFiftyMoveRule: boolean;
  updateIsFiftyMoveRule: (isRule: boolean) => void;
}

export function useLocalSetup() {
  const [whiteName, setWhiteName] = useState('');
  const [blackName, setBlackName] = useState('');

  const [selectedTimeControl, setSelectedTimeControl] = useState<TimeControl>(
    TimeControl.FREE_PLAY
  );

  const [isIncrement, setIsIncrement] = useState(false);
  const [isUndoRedo, setIsUndoRedo] = useState(false);
  const [isFiftyMoveRule, setIsFiftyMoveRule] = useState(true);

  function handleNameUpdate(color: PieceColor, value: string) {
    if (color === PieceColor.WHITE) setWhiteName(value);
    else setBlackName(value);
  }

  function updateSelectedTimeControl(timeControl: TimeControl) {
    setSelectedTimeControl(timeControl);
  }

  function updateIsIncrement(isIncrement: boolean) {
    setIsIncrement(isIncrement);
  }

  function updateIsUndoRedo(isUndoRedo: boolean) {
    setIsUndoRedo(isUndoRedo);
  }

  function updateIsFiftyMoveRule(isRule: boolean) {
    setIsFiftyMoveRule(isRule);
  }

  return {
    whiteName,
    blackName,
    handleNameUpdate,
    selectedTimeControl,
    updateSelectedTimeControl,
    isIncrement,
    updateIsIncrement,
    isUndoRedo,
    updateIsUndoRedo,
    isFiftyMoveRule,
    updateIsFiftyMoveRule,
  };
}

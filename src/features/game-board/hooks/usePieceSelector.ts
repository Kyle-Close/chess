/*
 * The goal of this is to hold onto the index of the selected piece
 *  it can be a number between 0 & 63 or null indicated nothing selected
 *
 */

import { useEffect, useState } from "react";
const MAX_LENGTH = 2;

export function usePieceSelector() {
  const [selectedList, setSelectedList] = useState<number[]>([]);

  function clear() {
    setSelectedList([]);
  }

  function append(index: number) {
    if (selectedList.length === MAX_LENGTH) { // Roll over (clear)
      clear()
    } else {
      setSelectedList([...selectedList, index])
    }
  }

  // Right click to clear the selected states
  useEffect(() => {
    const handleScreenClick = () => {
      clear()
    };

    document.addEventListener('contextmenu', handleScreenClick);
    return () => {
      document.removeEventListener('contextmenu', handleScreenClick);
    };
  }, []);

  return { selectedList, clear, append }
}

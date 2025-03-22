/*
 * The goal of this is to hold onto the index of the selected piece
 *  it can be a number between 0 & 63 or null indicated nothing selected
 *
 */

import { useQueryClient } from "@tanstack/react-query";
import { Game } from "base/zod/GameSchema";
import { useEffect, useState } from "react";

export function usePieceSelector() {
  const queryClient = useQueryClient();
  const game = queryClient.getQueryData<Game>(["game"]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const clear = () => {
    setSelectedIndex(null);
  }

  const updateSelectedIndex = (index: number) => {
    if (!game) return;
    if (game.board.squares[index].piece !== null) {
      setSelectedIndex(index);
    }
  }

  useEffect(() => {
    const handleScreenClick = () => {
      setSelectedIndex(null);
    };

    document.addEventListener('contextmenu', handleScreenClick);
    return () => {
      document.removeEventListener('contextmenu', handleScreenClick);
    };
  }, []);

  useEffect(() => {
    console.log(selectedIndex)
  }, [selectedIndex])

  return { selectedIndex, clear, updateSelectedIndex }
}

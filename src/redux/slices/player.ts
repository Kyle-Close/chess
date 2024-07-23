import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';
import { PieceColor } from '../../enums/PieceColor';
import { nanoid } from 'nanoid';

interface Player {
  id: string;
  name: string;
  color: PieceColor;
  isTurn: boolean;
  isInCheck: boolean;
  timerId: string;
}

// Create entity adaptor
const playerAdapter = createEntityAdapter<Player>();

const initialState = playerAdapter.getInitialState();

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    createPlayer: {
      reducer: (state, action: PayloadAction<Player>) => {
        playerAdapter.addOne(state, action.payload);
      },
      prepare: (player: Omit<Player, 'id'>) => ({
        payload: { ...player, id: nanoid() },
      }),
    },
    setName(state, action: PayloadAction<{ id: string; name: string }>) {
      const { id, name } = action.payload;
      const player = state.entities[id];
      if (player) {
        player.name = name;
      }
    },
    setColor(state, action: PayloadAction<{ id: string; color: PieceColor }>) {
      const { id, color } = action.payload;
      const player = state.entities[id];
      if (player) {
        player.color = color;
      }
    },
    setIsInCheck(state, action: PayloadAction<{ id: string; isInCheck: boolean }>) {
      const { id } = action.payload;
      state.entities[id].isInCheck = action.payload.isInCheck;
    },
    setIsTurn(state, action: PayloadAction<{ id: string; isTurn: boolean }>) {
      const { id } = action.payload;
      state.entities[id].isTurn = action.payload.isTurn;
    },
  },
});

export const { createPlayer, setName, setColor, setIsInCheck, setIsTurn } = playerSlice.actions;

export default playerSlice.reducer;

// Selector
export const { selectById: selectPlayerById, selectAll: selectAllPlayers } =
  playerAdapter.getSelectors(
    (state: { player: ReturnType<typeof playerSlice.reducer> }) => state.player
  );

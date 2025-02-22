import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';
import { PieceColor } from 'base/features/game-board/hooks/usePiece';
import { nanoid } from 'nanoid';

export interface Player {
  id: string;
  name: string;
  color: PieceColor;
  isTurn: boolean;
  isInCheck: boolean;
  remainingMaterialValue: number;
  timerId: string;
  castleRightsId: string;
  isAi: boolean;
}

// Create entity adaptor
const playerAdapter = createEntityAdapter<Player>();

const initialState = playerAdapter.getInitialState();

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    removeAllPlayers: playerAdapter.removeAll,
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
    toggleIsTurn(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      state.entities[id].isTurn = !state.entities[id].isTurn;
    },
    setRemainingMaterialValue(state, action: PayloadAction<{ id: string; value: number }>) {
      const { id, value } = action.payload;
      state.entities[id].remainingMaterialValue = value;
    },
    setIsAi(state, action: PayloadAction<{ id: string, value: boolean }>) {
      const { id, value } = action.payload;
      state.entities[id].isAi = value;
    }
  },
});

export const {
  createPlayer,
  removeAllPlayers,
  setName,
  setColor,
  setIsInCheck,
  setRemainingMaterialValue,
  setIsTurn,
  toggleIsTurn,
  setIsAi
} = playerSlice.actions;

export default playerSlice.reducer;

// Selector
export const { selectById: selectPlayerById, selectAll: selectAllPlayers } =
  playerAdapter.getSelectors(
    (state: { player: ReturnType<typeof playerSlice.reducer> }) => state.player
  );

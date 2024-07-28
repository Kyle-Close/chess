import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { initialCastleRights } from '../../hooks/useCastleRights';

export interface CastleRights {
  id: string;
  canCastleQueenSide: boolean;
  canCastleKingSide: boolean;
  queenSideIsAvailable: boolean;
  kingSideIsAvailable: boolean;
}

const castleRightsAdapter = createEntityAdapter<CastleRights>();

export const castleRightsSlice = createSlice({
  name: 'castleRights',
  initialState: castleRightsAdapter.getInitialState(),
  reducers: {
    removeAllCastleRights: castleRightsAdapter.removeAll,
    createCastleRights: {
      reducer: (state, action: PayloadAction<CastleRights>) => {
        castleRightsAdapter.addOne(state, action.payload);
      },
      prepare: () => ({
        payload: { ...initialCastleRights, id: nanoid() },
      }),
    },
    setCastleRights(state, action: PayloadAction<{ castleRights: CastleRights }>) {
      const { castleRights } = action.payload;
      const { id } = castleRights;
      state.entities[id] = castleRights;
    },
  },
});

export const { createCastleRights, removeAllCastleRights, setCastleRights } =
  castleRightsSlice.actions;

export default castleRightsSlice.reducer;

// Selector
export const { selectById: selectCastleRightsById, selectAll: selectAllCastleRights } =
  castleRightsAdapter.getSelectors(
    (state: { castleRights: ReturnType<typeof castleRightsSlice.reducer> }) => state.castleRights
  );

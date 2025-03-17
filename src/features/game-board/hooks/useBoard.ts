import { setupBoard } from 'base/redux/slices/board';
import { selectPlayerById } from 'base/redux/slices/player';
import { AppDispatch, RootState } from 'base/redux/store';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useStartEndAction } from './useStartEndAction';
import { PieceColor, PieceType } from './usePiece';
import { deepCopyBoard } from '../utils/board-utility/deepCopyBoard';
import { getKingIndex } from 'base/features/game-logic/utils/game-checks/getKingIndex';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useBoard() {

}

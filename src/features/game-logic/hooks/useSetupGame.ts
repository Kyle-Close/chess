import { useAppDispatch, useAppSelector } from 'base/features/game-board/hooks/useBoard';
import { initialCastleRights } from './useCastleRights';
import { selectPlayerById, setIsTurn } from 'base/redux/slices/player';
import { parseFenString } from '../utils/fen/parseFenString';
import { setupBoard } from 'base/redux/slices/board';
import { setEnPassantSquare, setFullMoves, setHalfMoves } from 'base/redux/slices/gameInfo';
import { setCastleRights } from 'base/redux/slices/castleRights';
import { getEnPassantTargetSquareFromFen } from '../utils/fen/getEnPassantTargetSquareFromFen';
import { buildBoardFromFen } from '../utils/fen/buildBoardFromFen';

export function useSetupGame() {
  const dispatch = useAppDispatch();
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const whitePlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.whitePlayerId));
  const blackPlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.blackPlayerId));

  function setupFromFEN(fenString: string) {
    const fenSegments = parseFenString(fenString);
    const initialBoard = buildBoardFromFen(fenSegments.initialPositions);

    // Set up board state.
    dispatch(setupBoard(initialBoard));

    // Set turn
    if (fenSegments.turn === 'w') {
      dispatch(setIsTurn({ id: whitePlayer.id, isTurn: true }));
      dispatch(setIsTurn({ id: blackPlayer.id, isTurn: false }));
    } else {
      dispatch(setIsTurn({ id: whitePlayer.id, isTurn: false }));
      dispatch(setIsTurn({ id: blackPlayer.id, isTurn: true }));
    }

    // Set game half moves
    const halfMoves = Number(fenSegments.halfMoves);
    dispatch(setHalfMoves(halfMoves));

    // Set game full moves
    const fullMoves = Number(fenSegments.fullMoves);
    dispatch(setFullMoves(fullMoves));

    // Set player castle rights
    dispatch(setCastleRights({ castleRights: { ...initialCastleRights, id: whitePlayer.id } }))
    dispatch(setCastleRights({ castleRights: { ...initialCastleRights, id: blackPlayer.id } }))

    // Set en passant target square
    const enPassantTargetSquare = getEnPassantTargetSquareFromFen(fenSegments.enPassant);
    dispatch(setEnPassantSquare(enPassantTargetSquare));
  }

  return { setupFromFEN };
}

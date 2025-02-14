import { buildBoardFromFen } from '../../../helpers/notation-setup/game-setup/buildBoardFromFen';
import { parseFenString } from '../../../helpers/notation-setup/game-setup/parseFenString';
import { getEnPassantTargetSquareFromFen } from '../../../helpers/notation-setup/game-setup/getEnPassantTargetSquareFromFen';
import { useAppDispatch, useAppSelector } from '../../game-board/hooks/useBoard';
import { setupBoard } from '../../../redux/slices/board';
import { setEnPassantSquare, setFullMoves, setHalfMoves } from '../../../redux/slices/gameInfo';
import { selectPlayerById, setIsTurn } from '../../../redux/slices/player';
import { setCastleRights } from '../../../redux/slices/castleRights';
import { initialCastleRights } from './useCastleRights';

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

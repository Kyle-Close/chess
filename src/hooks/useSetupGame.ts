import { buildBoardFromFen } from '../helpers/notation-setup/game-setup/buildBoardFromFen';
import { parseFenString } from '../helpers/notation-setup/game-setup/parseFenString';
import { PieceColor } from '../enums/PieceColor';
import { getEnPassantTargetSquareFromFen } from '../helpers/notation-setup/game-setup/getEnPassantTargetSquareFromFen';
import { useAppDispatch, useAppSelector } from './useBoard';
import { setupBoard } from '../redux/slices/board';
import { useCastleRights } from './useCastleRights';
import { setEnPassantSquare, setFullMoves, setHalfMoves } from '../redux/slices/gameInfo';
import { selectPlayerById, setIsTurn } from '../redux/slices/player';

export function useSetupGame() {
  const board = useAppSelector((state) => state.board);
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const dispatch = useAppDispatch();
  const whitePlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.whitePlayerId));
  const blackPlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.blackPlayerId));
  const whiteCastleRights = useCastleRights({ id: whitePlayer.castleRightsId });
  const blackCastleRights = useCastleRights({ id: blackPlayer.castleRightsId });

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
    whiteCastleRights.updateCastleRights(board, PieceColor.WHITE);
    blackCastleRights.updateCastleRights(board, PieceColor.BLACK);

    // Set en passant target square
    const enPassantTargetSquare = getEnPassantTargetSquareFromFen(fenSegments.enPassant);
    dispatch(setEnPassantSquare(enPassantTargetSquare));
  }

  return { setupFromFEN };
}

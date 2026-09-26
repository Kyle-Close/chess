import { useEffect, useMemo, useRef, useState } from 'react';
import { Game } from '../../../zod/GameSchema';
import { GameStatus } from 'base/zod/emums/GameStatus';
import { PieceType } from 'base/zod/emums/PieceType';
import { useExecuteMove } from 'base/features/api-utils/hooks/useExecuteMove';
import { MoveHint } from '../components/BoardView';
import { findKing, isGamePlaying } from '../utils/gameState';
import { getMoveSound, playSound } from '../utils/sounds';

export function useBoard(game: Game) {
	const executeMoveMutation = useExecuteMove();

	const [selected, setSelected] = useState<number | null>(null);
	const [promotion, setPromotion] = useState<{ start: number, end: number } | null>(null);
	const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);

	const isPlaying = isGamePlaying(game);
	const isEngineTurn = game.stockfishInfo ? game.activeColor === game.stockfishInfo.playingAs : false;
	const canMove = isPlaying && !isEngineTurn && !executeMoveMutation.isPending;

	const lastMove = game.lastMoveMetaData;
	const moveKey = lastMove ? `${lastMove.startIndex}-${lastMove.endIndex}` : null;

	// Sound + selection reset whenever a new move lands on the board (ours, optimistic or the engine's)
	const previousMoveKey = useRef<string | null | undefined>(undefined);
	useEffect(() => {
		const isFirstRender = previousMoveKey.current === undefined;
		const changed = previousMoveKey.current !== moveKey;
		previousMoveKey.current = moveKey;

		if (isFirstRender) {
			if (!lastMove && isPlaying) playSound('start');
			return;
		}
		if (changed && lastMove) playSound(getMoveSound(lastMove));
		setSelected(null);
		setPromotion(null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [moveKey]);

	const previousStatus = useRef(game.status);
	useEffect(() => {
		if (!isPlaying) {
			setIsGameOverModalOpen(true);
			if (previousStatus.current !== game.status) playSound('end');
		}
		previousStatus.current = game.status;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [game.status])

	// Escape backs out of a selection or a pending promotion
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key !== 'Escape') return;
			setSelected(null);
			setPromotion(null);
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, []);

	const targets = useMemo(() => {
		const map = new Map<number, MoveHint>();
		if (selected === null) return map;
		const piece = game.board.squares[selected].piece;
		if (!piece || piece.color !== game.activeColor) return map;
		for (const move of piece.validMoves) {
			map.set(move.endIndex, move.isCapture || move.isEnPassantCapture ? 'capture' : 'move');
		}
		return map;
	}, [selected, game]);

	const checkSquare = game.status === GameStatus.IN_CHECK || game.status === GameStatus.CHECKMATE
		? findKing(game, game.activeColor)
		: null;

	const isOwnPiece = (index: number) => game.board.squares[index].piece?.color === game.activeColor;

	/** Plays start -> end if legal. Returns false when the move isn't legal. */
	const tryMove = (start: number, end: number) => {
		const move = game.board.squares[start].piece?.validMoves.find(m => m.endIndex === end);
		if (!move) return false;

		if (move.isPromotion) {
			setPromotion({ start, end });
			return true;
		}

		executeMoveMutation.mutate({ gameId: game.id, start, end });
		setSelected(null);
		return true;
	};

	const handleSquareClicked = (index: number) => {
		if (!canMove || promotion) return;

		if (selected !== null) {
			if (selected === index) {
				setSelected(null);
				return;
			}
			if (tryMove(selected, index)) return;
		}

		// Clicking another of your own pieces switches the selection; anything else clears it
		setSelected(isOwnPiece(index) ? index : null);
	};

	const handleDragStart = (index: number) => {
		if (canMove && !promotion && isOwnPiece(index)) setSelected(index);
	};

	const handleDrop = (index: number) => {
		if (selected === null || selected === index) return;
		if (!tryMove(selected, index)) setSelected(null);
	};

	const choosePromotion = (pieceType: PieceType) => {
		if (!promotion) return;
		executeMoveMutation.mutate({ gameId: game.id, start: promotion.start, end: promotion.end, promotionPiece: pieceType });
		setPromotion(null);
		setSelected(null);
	};

	return {
		selected,
		targets,
		checkSquare,
		canMove,
		promotion,
		choosePromotion,
		cancelPromotion: () => setPromotion(null),
		handleSquareClicked,
		handleDragStart,
		handleDrop,
		isGameOverModalOpen,
		closeGameOverModal: () => setIsGameOverModalOpen(false),
	}
}

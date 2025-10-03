import { z } from "zod";
import { ColorSchema } from "./ColorSchema";
import { CastleRightsSchema } from "./CastleRights";
import { BoardSchema } from "./BoardSchema";
import { GameStatusSchema } from "./GameStatusSchema";
import { GameTypeSchema } from "./GameTypeSchema";
import { PieceTypeSchema } from "./PieceTypeSchema";
import { StockfishInfoSchema } from "./StockfishInfoSchema";

export const GameSchema = z.object({
  id: z.string(),
  type: GameTypeSchema,
  status: GameStatusSchema,
  winner: ColorSchema.nullable(),
  activeColor: ColorSchema,
  whiteCastleRights: CastleRightsSchema,
  blackCastleRights: CastleRightsSchema,
  enPassantIndex: z.number().nullable(),
  halfMoves: z.number(),
  fullMoves: z.number(),
  fenHistory: z.array(z.string()),
  board: BoardSchema,
  whiteMaterialValue: z.number(),
  blackMaterialValue: z.number(),
  moveHistory: z.array(z.string()),
  startTime: z.string(),
  endTime: z.string().nullable(),
  whiteRemainingTime: z.number(),
  blackRemainingTime: z.number(),
  lastMoveTimeStamp: z.string(),
  lastSyncedClockTimeStamp: z.string(),
  whiteCapturedPieces: z.array(PieceTypeSchema),
  blackCapturedPieces: z.array(PieceTypeSchema),
  stockfishInfo: StockfishInfoSchema.nullable().optional()
})

export type Game = z.infer<typeof GameSchema>

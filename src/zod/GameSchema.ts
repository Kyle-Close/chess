import { z } from "zod";
import { ColorSchema } from "./ColorSchema";
import { CastleRightsSchema } from "./CastleRights";
import { BoardSchema } from "./BoardSchema";
import { GameStatusSchema } from "./GameStatusSchema";
import { GameTypeSchema } from "./GameTypeSchema";

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
  moveHistory: z.array(z.string().nullable()),
  startTime: z.string(),
  endTime: z.string().nullable(),
})

export type Game = z.infer<typeof GameSchema>

import { z } from "zod";
import { ColorSchema } from "./ColorSchema";
import { CastleRightsSchema } from "./CastleRights";
import { BoardSchema } from "./BoardSchema";

export const GameSchema = z.object({
  id: z.string(),
  activeColor: ColorSchema,
  whiteCastleRights: CastleRightsSchema,
  blackCastleRights: CastleRightsSchema,
  enPassantIndex: z.number().nullable(),
  halfMoves: z.number(),
  fullMoves: z.number(),
  fenHistory: z.array(z.string()),
  board: BoardSchema,
  isCheck: z.boolean(),
  isCheckmate: z.boolean(),
  isStalemate: z.boolean(),
  whiteMaterialValue: z.number(),
  blackMaterialValue: z.number(),
  moveHistory: z.array(z.string().nullable())
})

export type Game = z.infer<typeof GameSchema>

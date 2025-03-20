import { z } from "zod";
import { ColorSchema } from "./ColorSchema";
import { CastleRightsSchema } from "./CastleRights";
import { BoardSchema } from "./BoardSchema";

export const GameSchema = z.object({
  id: z.string(),
  activeColor: ColorSchema,
  whiteCastleRights: CastleRightsSchema,
  blackCastleRights: CastleRightsSchema,
  enPassantIndex: z.number(),
  halfMoves: z.number(),
  fullMoves: z.number(),
  fenHistory: z.array(z.string()),
  board: BoardSchema
})

export type Game = z.infer<typeof GameSchema>

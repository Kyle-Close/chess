import { z } from "zod";
import { PieceTypeSchema } from "./PieceTypeSchema";
import { ColorSchema } from "./ColorSchema";
import { ValidMoveSchema } from "./ValidMovesSchema";

export const PieceSchema = z.object({
  pieceType: PieceTypeSchema,
  color: ColorSchema,
  hasMoved: z.boolean(),
  index: z.number(),
  validMoves: z.array(ValidMoveSchema)
})

export type Piece = z.infer<typeof PieceSchema>

import { z } from "zod";
import { PieceTypeSchema } from "./PieceTypeSchema";
import { ColorSchema } from "./ColorSchema";
import { MoveMetaDataSchema } from "./MoveMetaData";

export const PieceSchema = z.object({
  pieceType: PieceTypeSchema,
  color: ColorSchema,
  hasMoved: z.boolean(),
  index: z.number(),
  validMoves: z.array(MoveMetaDataSchema)
})

export type Piece = z.infer<typeof PieceSchema>

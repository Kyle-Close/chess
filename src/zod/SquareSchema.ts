import { z } from "zod";
import { PieceSchema } from "./PieceSchema";
import { BoardFileSchema } from "./BoardFileSchema";
import { BoardRankSchema } from "./BoardRank";

export const SquareSchema = z.object({
  index: z.number(),
  piece: PieceSchema,
  file: BoardFileSchema,
  rank: BoardRankSchema
})

export type Square = z.infer<typeof SquareSchema>

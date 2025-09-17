import { z } from "zod";

export const MoveMetaDataSchema = z.object({
  startIndex: z.number(),
  endIndex: z.number(),
  isCapture: z.boolean(),
  isEnPassantCapture: z.boolean(),
  isCastle: z.boolean(),
  isPromotion: z.boolean(),
  causesCheck: z.boolean(),
  notation: z.string()
})

export type MoveMetaData = z.infer<typeof MoveMetaDataSchema>

export const MoveMetaDataArraySchema = z.array(MoveMetaDataSchema);

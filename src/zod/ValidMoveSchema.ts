import { z } from "zod";

export const ValidMoveSchema = z.object({
  startIndex: z.number(),
  endIndex: z.number(),
  isCapture: z.boolean(),
  isEnPassantCapture: z.boolean(),
  isCastle: z.boolean(),
  isPromotion: z.boolean(),
  causesCheck: z.boolean()
})

export type ValidMove = z.infer<typeof ValidMoveSchema>

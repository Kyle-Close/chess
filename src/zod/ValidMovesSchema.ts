import { z } from "zod";

export const ValidMoveSchema = z.object({
  startIndex: z.number(),
  endIndex: z.number(),
  isCapture: z.boolean()
})

export type ValidMove = z.infer<typeof ValidMoveSchema>

export const ValidMoveArraySchema = z.array(ValidMoveSchema);

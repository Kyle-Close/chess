import { z } from "zod"
import { SquareSchema } from "./SquareSchema"

export const BoardSchema = z.object({
  squares: z.array(SquareSchema)
})

export type Board = z.infer<typeof BoardSchema>

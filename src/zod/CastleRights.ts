import { z } from "zod"

export const CastleRightsSchema = z.object({
  kingSide: z.boolean(),
  queenSide: z.boolean()
})

export type CastleRights = z.infer<typeof CastleRightsSchema>

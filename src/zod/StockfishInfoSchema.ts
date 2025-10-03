import { z } from "zod";
import { ColorSchema } from "./ColorSchema";

export const StockfishInfoSchema = z.object({
  strength: z.number(),
  playingAs: ColorSchema,
})

export type StockfishInfo = z.infer<typeof StockfishInfoSchema>

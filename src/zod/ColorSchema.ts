import { z } from "zod"
import { Color as ColorLocal } from "./emums/Color";

export const ColorSchema = z.nativeEnum(ColorLocal);

export type Color = z.infer<typeof ColorSchema>

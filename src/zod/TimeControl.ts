import { z } from "zod";
import { TimeControlType as TimeControlLocal } from "./emums/TimeControl";

export const TimeControlTypeSchema = z.nativeEnum(TimeControlLocal);

export type TimeControlType = z.infer<typeof TimeControlTypeSchema>

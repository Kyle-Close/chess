import { z } from "zod"
import { GameType as GameTypeLocal } from "./emums/GameType";

export const GameTypeSchema = z.nativeEnum(GameTypeLocal);

export type GameType = z.infer<typeof GameTypeSchema>

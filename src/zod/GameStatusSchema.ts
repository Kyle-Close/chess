import { z } from "zod"
import { GameStatus as GameStatusLocal } from "./emums/GameStatus";

export const GameStatusSchema = z.nativeEnum(GameStatusLocal);

export type GameStatus = z.infer<typeof GameStatusSchema>

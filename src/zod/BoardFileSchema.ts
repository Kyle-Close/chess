import { z } from "zod";
import { BoardFile as BoardFileLocal } from "./emums/BoardFile";

export const BoardFileSchema = z.nativeEnum(BoardFileLocal);

export type BoardFile = z.infer<typeof BoardFileSchema>

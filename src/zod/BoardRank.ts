import { z } from "zod";
import { BoardRank as BoardRankLocal } from "./emums/BoardRank";

export const BoardRankSchema = z.nativeEnum(BoardRankLocal);

export type BoardRank = z.infer<typeof BoardRankSchema>

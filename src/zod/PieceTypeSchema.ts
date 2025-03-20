import { z } from "zod";
import { PieceType as PieceTypeLocal } from "./emums/PieceType";

export const PieceTypeSchema = z.nativeEnum(PieceTypeLocal);

export type PieceType = z.infer<typeof PieceTypeSchema>

import { Note } from "@prisma/client";

export type TypeNoteData = Omit<Note, "id" | "createdAt">;

export type PartialNote = Partial<Note>;

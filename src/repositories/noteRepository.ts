import { TypeNoteData } from "../types/NoteTypes";
import client from "../databases/database";

export async function insert(data: TypeNoteData) {
  await client.note.create({ data });
}

export async function deleteNote(id: number) {
  await client.note.delete({ where: { id } });
}

export async function findByTitle(title: string, userId: number) {
  const rows = await client.note.findFirst({
    where: {
      title: {
        equals: title,
        mode: "insensitive",
      },
      userId,
    },
  });
  return rows;
}

export async function findById(id: number) {
  const rows = await client.note.findUnique({ where: { id } });
  return rows;
}

export async function findAllNotes(userId: number) {
  const rows = await client.note.findMany({
    where: { userId },
  });
  return rows;
}

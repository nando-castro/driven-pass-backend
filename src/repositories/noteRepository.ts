import { TypeNoteData } from "../types/NoteTypes";
import client from "../databases/datasbase";

export async function insert(data: TypeNoteData) {
  await client.note.create({ data });
}

export async function deleteNote(id: number) {
  await client.note.delete({ where: { id } });
}

//falta compara com o user
export async function findByTitle(title: string) {
  const rows = await client.note.findUnique({
    where: { title },
  });
  return rows;
}

export async function findById(id: number) {
  const rows = await client.note.findUnique({ where: { id } });
  return rows;
}

export async function findAllNotes(userId: number) {
  const rows = await client.note.findMany({ where: { userId } });
  return rows;
}

import { unauthorizedError } from "./../utils/errorUtils";
import jwt from "jsonwebtoken";
import { TypeNoteData } from "./../types/NoteTypes";
import * as noteRepository from "../repositories/noteRepository";
import { conflictError } from "../utils/errorUtils";

export async function createNote(note: TypeNoteData, token: string) {
  const noteExists = await noteRepository.findByTitle(note.title);
  const dataUser = JSON.stringify(
    jwt.verify(token, `${process.env.JWT_SECRETKEY}`)
  );
  const parsedData: { id: number } = JSON.parse(dataUser);
  if (noteExists) throw conflictError(`note exixts`);
  const data = { ...note, userId: parsedData.id };
  await noteRepository.insert(data);
}

export async function removeNote(id: number, token: string) {
  const noteExists = await noteRepository.findById(id);
  const dataUser = JSON.stringify(
    jwt.verify(token, `${process.env.JWT_SECRETKEY}`)
  );
  const parsedData: { id: number } = JSON.parse(dataUser);
  if (noteExists?.userId !== parsedData.id)
    throw unauthorizedError(`this credential does not belong to this user`);
  if (noteExists) throw conflictError(`note exixts`);
  await noteRepository.deleteNote(id);
}

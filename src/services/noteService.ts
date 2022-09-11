import { formatDate } from "./../utils/dateUtils";
import { notFoundError, unauthorizedError } from "./../utils/errorUtils";
import jwt from "jsonwebtoken";
import { TypeNoteData } from "./../types/NoteTypes";
import * as noteRepository from "../repositories/noteRepository";
import { conflictError } from "../utils/errorUtils";
import { jwtVerify } from "../utils/jwtUtils";

export async function createNote(note: TypeNoteData, token: string) {
  const dataUser = await jwtVerify(token);
  const noteExists = await noteRepository.findByTitle(note.title, dataUser.id);
  if (noteExists) throw conflictError(`title note exixts`);
  const data = { ...note, userId: dataUser.id };
  await noteRepository.insert(data);
}

export async function removeNote(id: number, token: string) {
  const dataUser = JSON.stringify(
    jwt.verify(token, `${process.env.JWT_SECRETKEY}`)
  );
  const parsedData: { id: number } = JSON.parse(dataUser);
  const noteExists = await noteRepository.findById(id);
  if (!noteExists) throw notFoundError(`no data in the database`);
  if (parsedData.id !== noteExists.userId)
    throw unauthorizedError(`this note does not belong to this user`);
  await noteRepository.deleteNote(id);
}

export async function getNoteById(id: number, token: string) {
  const dataUser = await jwtVerify(token);
  const noteExists = await noteRepository.findById(id);
  if (!noteExists) throw notFoundError(`no data in the database`);
  if (dataUser.id !== noteExists.userId)
    throw unauthorizedError(`this note does not belong to this user`);
  const result = await noteRepository.findById(id);
  const dateFormated = formatDate(noteExists.createdAt);
  const data = {
    ...result,
    createdAt: dateFormated,
  };
  return data;
}

export async function getAllNotes(token: string) {
  const dataUser = await jwtVerify(token);
  const result = await noteRepository.findAllNotes(dataUser.id);
  const data = result.map((note) => {
    return {
      ...note,
      createdAt: formatDate(note.createdAt),
    };
  });
  return data;
}

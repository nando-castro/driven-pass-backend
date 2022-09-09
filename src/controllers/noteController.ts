import { TypeNoteData } from "./../types/NoteTypes";
import { Request, Response } from "express";
import * as noteService from "../services/noteService";

export async function createNote(req: Request, res: Response) {
  const { token } = res.locals;
  const note: TypeNoteData = req.body;
  await noteService.createNote(note, token);
  res.status(201).send(`create note sucessfull`);
}

export async function getNoteById(req: Request, res: Response) {
  const result = `ok`;
  res.status(200).send(result);
}

export async function getNotes(req: Request, res: Response) {
  const result = `ok`;
  res.status(200).send(result);
}

export async function removeNote(req: Request, res: Response) {
  const { token } = res.locals;
  const { id } = req.params;
  await noteService.removeNote(Number(id), token);
  res.status(200).send(`delete note sucessfull`);
}

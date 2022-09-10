import { TypeDocumentData } from "./../types/DocumentTypes";
import { Request, Response } from "express";
import * as documentService from "../services/documentService";

export async function createDocument(req: Request, res: Response) {
  const { token } = res.locals;
  const document: TypeDocumentData = req.body;
  await documentService.createCard(document, token);
  res.status(201).send(`document create sucessfull`);
}

export async function removeDocument(req: Request, res: Response) {
  const { token } = res.locals;
  const { id } = req.params;
  await documentService.removeDocument(Number(id), token);
  res.status(200).send(`remove document sucessfull`);
}

export async function getDocument(req: Request, res: Response) {
  const { token } = res.locals;
  const { id } = req.params;
  const result = await documentService.getDocument(Number(id), token);
  res.status(200).send(result);
}

export async function getAllDocuments(req: Request, res: Response) {
  const { token } = res.locals;
  const result = await documentService.getAllDocument(token);
  res.status(200).send(result);
}

import { TypeDocumentData } from "./../types/DocumentTypes";
import { jwtVerify } from "../utils/jwtUtils";
import * as documentRepository from "../repositories/documentRepository";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils";

export async function createCard(document: TypeDocumentData, token: string) {
  const dataUser = await jwtVerify(token);
  const documentTitleExists = await documentRepository.findByTitle(
    document.title,
    dataUser.id
  );
  if (documentTitleExists) throw conflictError(`title document exists`);
  const data = {
    ...document,
    userId: dataUser.id,
  };
  await documentRepository.insert(data);
}
export async function removeDocument(id: number, token: string) {
  const dataUser = await jwtVerify(token);
  const cardExists = await documentRepository.findById(id);
  if (!cardExists) throw notFoundError(`no data in the database`);
  if (dataUser.id !== cardExists.userId)
    throw unauthorizedError(`this document does not belong to this user`);
  await documentRepository.deleteDocument(id);
}
export async function getDocument(id: number, token: string) {
  const dataUser = await jwtVerify(token);
  const cardExists = await documentRepository.findById(id);
  if (!cardExists) throw notFoundError(`no data in the databases`);
  if (dataUser.id !== cardExists.userId)
    throw unauthorizedError(`this document does not belong to this user`);
  return cardExists;
}
export async function getAllDocument(token: string) {
  const dataUser = await jwtVerify(token);
  const result = await documentRepository.findAll(dataUser.id);
  return result;
}

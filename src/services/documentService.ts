import { formatDate } from "./../utils/dateUtils";
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
  const documentExists = await documentRepository.findById(id);
  if (!documentExists) throw notFoundError(`no data in the database`);
  if (dataUser.id !== documentExists.userId)
    throw unauthorizedError(`this document does not belong to this user`);
  await documentRepository.deleteDocument(id);
}
export async function getDocument(id: number, token: string) {
  const dataUser = await jwtVerify(token);
  const documentExists = await documentRepository.findById(id);
  if (!documentExists) throw notFoundError(`no data in the databases`);
  if (dataUser.id !== documentExists.userId)
    throw unauthorizedError(`this document does not belong to this user`);
  const dateFormated = formatDate(documentExists.createdAt);
  const data = {
    ...documentExists,
    createdAt: dateFormated,
  };
  return data;
}
export async function getAllDocument(token: string) {
  const dataUser = await jwtVerify(token);
  const result = await documentRepository.findAll(dataUser.id);
  const data = result.map((document) => {
    return {
      ...document,
      createdAt: formatDate(document.createdAt),
    };
  });
  return data;
}

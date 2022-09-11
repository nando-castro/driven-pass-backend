import { TypeDocumentData } from "./../types/DocumentTypes";
import client from "../databases/database";

export async function insert(data: TypeDocumentData) {
  await client.document.create({ data });
}

export async function deleteDocument(id: number) {
  await client.document.delete({ where: { id } });
}
export async function findByTitle(title: string, userId: number) {
  const rows = await client.document.findFirst({ where: {
    title: {
      equals: title,
      mode: "insensitive",
    },
    userId,
  }, });
  return rows;
}

export async function findById(id: number) {
  const rows = await client.document.findUnique({ where: { id } });
  return rows;
}

export async function findAll(userId: number) {
  const rows = await client.document.findMany({ where: { userId } });
  return rows;
}

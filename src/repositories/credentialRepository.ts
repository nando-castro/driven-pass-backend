import { TypeCredentialData } from "../types/CrendentialTypes";
import client from "../databases/datasbase";

export async function insert(data: TypeCredentialData) {
  await client.credential.create({
    data,
  });
}

export async function findByTitle(title: string) {
  const rows = await client.credential.findFirst({
    where: {
      title,
    },
  });
  return rows;
}

export async function findCredentialById(id: number) {
  const rows = await client.credential.findUnique({
    where: { id },
  });
  return rows;
}

export async function findAllCredentials(userId: number) {
  const rows = await client.note.findMany({
    where: { userId },
  });
  return rows;
}

export async function deleteById(id: number) {
  await client.credential.delete({ where: { id } });
}

import {
  PartialCredentialData,
  TypeCredentialData,
} from "../types/CrendentialTypes";
import client from "../databases/datasbase";

/* export interface ICrendential {
  id: number;
  title: string;
  url: string;
  userName: string;
  password: string;
} */

export async function insert(createCredential: TypeCredentialData) {
  await client.credential.create({
    data: {
      userId: createCredential.userId,
      title: createCredential.title,
      url: createCredential.url,
      userName: createCredential.userName,
      password: createCredential.password,
    },
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

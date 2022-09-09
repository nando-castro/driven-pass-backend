import client from "../databases/database";

export interface User {
  id: number;
  email: string;
  password: string;
}

export async function insert(email: string, password: string) {
  await client.user.create({
    data: {
      email: email,
      password: password,
    },
  });
}

export async function findByUser(email: string) {
  const rows = await client.user.findFirst({
    where: { email },
  });
  return rows;
}

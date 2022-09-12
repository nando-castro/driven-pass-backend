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
    where: { email: { equals: email, mode: "insensitive" } },
  });
  return rows;
}

export async function insertSession(userId: number, token: string) {
  await client.session.create({
    data: {
      userId: userId,
      token: token,
    },
  });
}

export async function findSession(userId: number) {
  const rows = await client.session.findFirst({
    where: {
      userId,
    },
  });
  return rows;
}

export async function updateSession(
  token: string,
  newToken: string,
  dateNow: Date
) {
  const rows = await client.session.update({
    where: {
      token,
    },
    data: {
      token: newToken,
      createdAt: dateNow,
    },
  });
  return rows;
}

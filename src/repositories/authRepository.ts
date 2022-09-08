import { CreateUserRegister } from "./../types/CreateUserRegister";
import client from "../databases/datasbase";

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

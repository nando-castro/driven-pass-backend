import client from "../databases/database";
import { TypeNetworkData } from "./../types/NetworkTypes";

export async function insert(data: TypeNetworkData) {
  await client.network.create({ data });
}

export async function deleteNetwork(id: number) {
  await client.network.delete({ where: { id } });
}
export async function findByTitle(title: string, userId: number) {
  const rows = await client.network.findFirst({
    where: {
      title: {
        equals: title,
        mode: "insensitive",
      },
      userId,
    },
  });
  return rows;
}

export async function findById(id: number) {
  const rows = await client.network.findUnique({ where: { id } });
  return rows;
}

export async function findAll(userId: number) {
  const rows = await client.network.findMany({ where: { userId } });
  return rows;
}

import { TypeCardData } from "./../types/CardTypes";
import client from "../databases/database";

export async function insert(card: TypeCardData) {
  await client.card.create({ data: card });
}

export async function deleteCard(id: number) {
  await client.card.delete({ where: { id } });
}

export async function findById(id: number) {
  const rows = await client.card.findUnique({ where: { id } });
  return rows;
}

export async function findByTitle(title: string, userId: number) {
  const rows = await client.card.findFirst({ where: {
    title: {
      equals: title,
      mode: "insensitive",
    },
    userId,
  }, });
  return rows;
}

export async function findAll(userId: number) {
  const rows = await client.card.findMany({ where: { userId } });
  return rows;
}

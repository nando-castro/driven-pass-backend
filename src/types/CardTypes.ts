import { Card } from "@prisma/client";

export interface ICard {
  id: number;
  userId: number;
  title: string;
  numero: string;
  cardholderName: string;
  password: string;
  securityCode: string;
  expirationDate: string;
  isVirtual: boolean;
  type: string;
  createdAt: string;
}

export type TypeCardData = Omit<Card, "id" | "createdAt">;
export type PartialCard = Partial<Card>;

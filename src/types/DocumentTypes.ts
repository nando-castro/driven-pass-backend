import { Network } from "@prisma/client";

export interface INetwork {
  id: number;
  userId: number;
  title: string;
  name: string;
  password: string;
  createdAt: string;
}

export type TypeNetworkData = Omit<Network, "id" | "createdAt">;
export type PartialNetwork = Partial<Network>;

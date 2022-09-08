import { User } from "@prisma/client";

export type TypeUserData = Omit<User, "id">;
export type PartialUser = Partial<User>;

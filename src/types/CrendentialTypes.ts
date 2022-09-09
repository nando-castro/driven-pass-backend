import { Credential } from "@prisma/client";

export type TypeCredentialData = Omit<Credential, `id` | `createdAt`>;

export type PartialCredentialData = Partial<Credential>;

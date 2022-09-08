import { Credential } from "@prisma/client";

export type TypeCredentialData = Omit<Credential, `id`>;

export type PartialCredentialData = Partial<Credential>;

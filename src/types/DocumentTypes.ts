import { Document } from "@prisma/client";

export interface IDocument {
  id: number;
  userId: number;
  title: string;
  name: string;
  type: string;
  issueDate: string;
  validity: string;
  registerNumber: string;
  issuer: string;
  createdAt: string;
}

export type TypeDocumentData = Omit<Document, "id" | "createdAt">;
export type PartialDocument = Partial<Document>;

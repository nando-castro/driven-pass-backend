import { Request, Response } from "express";
import { TypeCredentialData } from "../types/CrendentialTypes";
import * as credentialService from "../services/credentialService";

export async function createCredential(req: Request, res: Response) {
  const credential: TypeCredentialData = req.body;
  await credentialService.createCredential(credential);
  res.status(200).send(`credential add sucessfull`);
}

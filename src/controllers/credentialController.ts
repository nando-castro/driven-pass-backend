import { Request, Response } from "express";
import { TypeCredentialData } from "../types/CrendentialTypes";
import * as credentialService from "../services/credentialService";

export async function createCredential(req: Request, res: Response) {
  const credential: TypeCredentialData = req.body;
  const { token } = res.locals;
  await credentialService.createCredential(credential, token);
  res.status(201).send(`credential add sucessfull`);
}

export async function getCredential(req: Request, res: Response) {
  const { token } = res.locals;
  const { id } = req.params;
  const result = await credentialService.findCredentialById(Number(id), token);
  res.status(200).send(result);
}

export async function getAllCredentials(req: Request, res: Response) {
  const { token } = res.locals;
  const result = await credentialService.getAllCredentials(token);
  res.status(200).send(result);
}

export async function removeCredential(req: Request, res: Response) {
  const { token } = res.locals;
  const { id } = req.params;
  await credentialService.removeCredential(Number(id), token);
  res.status(200).send(`delete credential sucessfull`);
}

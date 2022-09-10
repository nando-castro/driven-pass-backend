import { TypeNetworkData } from "./../types/NetworkTypes";
import { Request, Response } from "express";
import * as networkService from "../services/networkService";

export async function createNetwork(req: Request, res: Response) {
  const { token } = res.locals;
  const network: TypeNetworkData = req.body;
  await networkService.createNetwork(network, token);
  res.status(201).send(`create Network sucessfull`);
}

export async function getNetworkById(req: Request, res: Response) {
  const { token } = res.locals;
  const { id } = req.params;
  const result = await networkService.getNetworkById(Number(id), token);
  res.status(200).send(result);
}

export async function getNetworks(req: Request, res: Response) {
  const { token } = res.locals;
  const result = await networkService.getNetworks(token);
  res.status(200).send(result);
}

export async function removeNetwork(req: Request, res: Response) {
  const { token } = res.locals;
  const { id } = req.params;

  await networkService.removeNetwork(Number(id), token);
  res.status(200).send(`delete Network sucessfull`);
}

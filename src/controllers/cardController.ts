import { TypeCardData } from "./../types/CardTypes";
import { Request, Response } from "express";
import * as cardService from "../services/cardService";

export async function createCard(req: Request, res: Response) {
  const { token } = res.locals;
  const card: TypeCardData = req.body;
  await cardService.createCard(card, token);
  res.status(201).send(`card create sucessfull`);
}

export async function removeCard(req: Request, res: Response) {
  const { token } = res.locals;
  const { id } = req.params;
  await cardService.removeCard(Number(id), token);
  res.status(200).send(`remove card sucessfull`);
}

export async function getCard(req: Request, res: Response) {
  const { token } = res.locals;
  const { id } = req.params;
  const result = await cardService.getCard(Number(id), token);
  res.status(200).send(result);
}

export async function getAllCards(req: Request, res: Response) {
  const { token } = res.locals;
  const result = await cardService.getAllCards(token);
  res.status(200).send(result);
}

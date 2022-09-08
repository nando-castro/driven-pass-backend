import { CreateUserRegister } from "./../types/CreateUserRegister";
import { Request, Response } from "express";
import * as authService from "../services/authService";

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  await authService.insertUser(email, password);
  res.status(200).send(`registered user`);
}

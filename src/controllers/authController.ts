import { CreateUserRegister } from "./../types/CreateUserRegister";
import { Request, Response } from "express";
import * as authService from "../services/authService";

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  await authService.registerUser(email, password);
  res.status(201).send(`registered user`);
}

export async function login(req: Request, res: Response) {
  const user: CreateUserRegister = req.body;
  const result = await authService.loginUser(user);
  console.log(result);
  res.status(200).send(result);
}

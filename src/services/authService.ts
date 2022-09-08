import { CreateUserRegister } from "./../types/CreateUserRegister";
import * as authRepository from "../repositories/authRepository";
import { conflictError } from "./../utils/errorUtils";
import bcrypt from "bcrypt";

export async function insertUser(email: string, password: string) {
  const userExists = await authRepository.findByUser(email);
  if (userExists) {
    throw conflictError(`user already registered`);
  }
  const passcrypt = bcrypt.hashSync(password, 10);
  await authRepository.insert(email, passcrypt);
}

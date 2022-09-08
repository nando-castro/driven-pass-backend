import { TypeUserData } from "../types/UserTypes";
import * as authRepository from "../repositories/authRepository";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "./../utils/errorUtils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerUser(email: string, password: string) {
  const userExists = await authRepository.findByUser(email);
  if (userExists) {
    throw conflictError(`user already registered`);
  }
  const passcrypt = bcrypt.hashSync(password, 10);
  await authRepository.insert(email, passcrypt);
}

export async function loginUser(user: TypeUserData) {
  const userExists = await authRepository.findByUser(user.email);
  if (!userExists) {
    throw notFoundError(`user not registered`);
  }
  const decryptpass = bcrypt.compareSync(user.password, userExists.password);
  if (!decryptpass) {
    throw unauthorizedError(`email or password incorrect`);
  }
  const data = {
    id: userExists.id,
  };
  const token = jwt.sign(data, `${process.env.JWT_SECRETKEY}`, {
    expiresIn: 60 * 60 * 24,
  });
  return token;
}

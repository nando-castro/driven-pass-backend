import { cryptPassword, decryptPassword } from "./../utils/passwordUtils";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "./../utils/errorUtils";
import { TypeCredentialData } from "../types/CrendentialTypes";
import * as credentialRepository from "../repositories/credentialRepository";
import jwt from "jsonwebtoken";
/* import Cryptr from "cryptr";
const cryptr = new Cryptr(`${process.env.SECRET_KEY}`); */

export async function createCredential(
  credential: TypeCredentialData,
  token: string
) {
  const dataUser = JSON.stringify(
    jwt.verify(token, `${process.env.JWT_SECRETKEY}`)
  );
  const parsedData: { id: number } = JSON.parse(dataUser);
  const credentialTitleExists = await credentialRepository.findByTitle(
    credential.title
  );
  if (credentialTitleExists) throw conflictError(`credential exists`);
  const encryptPassword = await cryptPassword(credential.password);
  const data = {
    userId: parsedData.id,
    title: credential.title,
    url: credential.url,
    userName: credential.userName,
    password: encryptPassword,
  };
  await credentialRepository.insert(data);
}

export async function findCredentialById(id: number, token: string) {
  const dataUser = JSON.stringify(
    jwt.verify(token, `${process.env.JWT_SECRETKEY}`)
  );
  const parsedData: { id: number } = JSON.parse(dataUser);
  const credentialExists = await credentialRepository.findCredentialById(id);
  if (!credentialExists) throw notFoundError(`no data in the database`);
  if (parsedData.id !== credentialExists?.id)
    throw unauthorizedError(`this credential does not belong to this user`);
  const descryptPassword = await decryptPassword(credentialExists.password);
  const data = {
    title: credentialExists.title,
    url: credentialExists.url,
    userName: credentialExists.userName,
    password: descryptPassword,
    userId: credentialExists.userId,
  };
  return data;
}

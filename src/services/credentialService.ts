import { cryptPassword, decryptPassword } from "./../utils/passwordUtils";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "./../utils/errorUtils";
import { TypeCredentialData } from "../types/CrendentialTypes";
import * as credentialRepository from "../repositories/credentialRepository";
import { jwtVerify } from "../utils/jwtUtils";

export async function createCredential(
  credential: TypeCredentialData,
  token: string
) {
  const dataUser = await jwtVerify(token);
  const credentialTitleExists = await credentialRepository.findByTitle(
    credential.title
  );
  if (credentialTitleExists) throw conflictError(`credential exists`);
  const encryptPassword = await cryptPassword(credential.password);
  const data = {
    ...credential,
    userId: dataUser.id,
    password: encryptPassword,
  };
  await credentialRepository.insert(data);
}

export async function findCredentialById(id: number, token: string) {
  const dataUser = await jwtVerify(token);
  const credentialExists = await credentialRepository.findCredentialById(id);
  if (!credentialExists) throw notFoundError(`no data in the database`);
  if (dataUser.id !== credentialExists.id)
    throw unauthorizedError(`this credential does not belong to this user`);
  const descryptPassword = decryptPassword(credentialExists.password);
  const data = {
    title: credentialExists.title,
    url: credentialExists.url,
    userName: credentialExists.userName,
    password: descryptPassword,
    userId: credentialExists.userId,
    createdAt: credentialExists.createdAt,
  };
  return data;
}

export async function getAllCredentials(token: string) {
  const dataUser = await jwtVerify(token);
  const result = await credentialRepository.findAllCredentials(dataUser.id);
  const data = result.map((credential) => {
    return {
      ...credential,
      password: decryptPassword(credential.password),
    };
  });
  return data;
}

export async function removeCredential(id: number, token: string) {
  const dataUser = await jwtVerify(token);
  const credentialExists = await credentialRepository.findCredentialById(id);
  if (!credentialExists) throw notFoundError(`no data in the database`);
  if (dataUser.id !== credentialExists.id)
    throw unauthorizedError(`this credential does not belong to this user`);

  await credentialRepository.deleteById(id);
}

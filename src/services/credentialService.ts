import { cryptPassword, decryptPassword } from "./../utils/passwordUtils";
import { conflictError, notFoundError } from "./../utils/errorUtils";
import { TypeCredentialData } from "../types/CrendentialTypes";
import * as credentialRepository from "../repositories/credentialRepository";
/* import Cryptr from "cryptr";
const cryptr = new Cryptr(`${process.env.SECRET_KEY}`); */

export async function createCredential(credential: TypeCredentialData) {
  const credentialTitleExists = await credentialRepository.findByTitle(
    credential.title
  );
  if (credentialTitleExists) throw conflictError(`credential exists`);

  const encryptPassword = await cryptPassword(credential.password);
  const data = {
    title: credential.title,
    url: credential.url,
    userName: credential.userName,
    password: encryptPassword,
  };
  await credentialRepository.insert(data);
}

export async function findCredentialById(id: number) {
  const credentialExists = await credentialRepository.findCredentialById(id);
  if (!credentialExists) throw notFoundError(`no data in the database`);
  const descryptPassword = await decryptPassword(credentialExists.password);
  const data = {
    title: credentialExists.title,
    url: credentialExists.url,
    userName: credentialExists.userName,
    password: descryptPassword,
  };
  return data;
}

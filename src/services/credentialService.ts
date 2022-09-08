import { conflictError } from "./../utils/errorUtils";
import { TypeCredentialData } from "../types/CrendentialTypes";
import * as credentialRepository from "../repositories/credentialRepository";
import Cryptr from "cryptr";
const cryptr = new Cryptr(`${process.env.SECRET_KEY}`);

export async function createCredential(credential: TypeCredentialData) {
  const credentialTitleExists = await credentialRepository.findByTitle(
    credential.title
  );
  if (credentialTitleExists) throw conflictError(`credential exists`);

  const encryptPassword = cryptr.encrypt(credential.password);
  const data = {
    title: credential.title,
    url: credential.url,
    userName: credential.userName,
    password: encryptPassword,
  };
  await credentialRepository.insert(data);
}

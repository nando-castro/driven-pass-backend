import { cryptPassword, decryptPassword } from "./../utils/passwordUtils";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "./../utils/errorUtils";
import { TypeNetworkData } from "./../types/NetworkTypes";
import { jwtVerify } from "./../utils/jwtUtils";
import * as networkRepository from "../repositories/networkRepository";

export async function createNetwork(network: TypeNetworkData, token: string) {
  const dataUser = await jwtVerify(token);
  const networkTitleExists = await networkRepository.findByTitle(network.title);
  if (networkTitleExists) throw conflictError(`network title exists`);
  const encryptPassword = await cryptPassword(network.password);
  const data = {
    userId: dataUser.id,
    title: network.title,
    name: network.name,
    password: encryptPassword,
  };
  await networkRepository.insert(data);
}

export async function removeNetwork(id: number, token: string) {
  const dataUser = await jwtVerify(token);
  const networkExists = await networkRepository.findById(id);
  if (!networkExists) throw notFoundError(`no data in the database`);
  if (dataUser.id !== networkExists.userId)
    throw unauthorizedError(`this credential does not belong to this user`);
  await networkRepository.deleteNetwork(id);
}

export async function getNetworkById(id: number, token: string) {
  const dataUser = await jwtVerify(token);
  const networkExists = await networkRepository.findById(id);
  if (dataUser.id !== id)
    throw unauthorizedError(`this network does not belong to this user`);
  if (!networkExists) throw notFoundError(`no data in the databases`);
  const descryptPassword = await decryptPassword(networkExists.password);
  const data = {
    id: networkExists.id,
    title: networkExists.title,
    userId: networkExists.userId,
    name: networkExists.name,
    password: descryptPassword,
    createAt: networkExists.createdAt,
  };
  return data;
}

export async function getNetworks(token: string) {
  const dataUser = await jwtVerify(token);
  const result = await networkRepository.findAll(dataUser.id);
  const data = result.map((network) => {
    return {
      ...network,
      password: decryptPassword(network.password),
    };
  });
  return data;
}

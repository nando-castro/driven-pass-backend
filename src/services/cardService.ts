import { jwtVerify } from "../utils/jwtUtils";
import { TypeCardData } from "./../types/CardTypes";
import * as cardRepository from "../repositories/cardRepository";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils";
import { cryptPassword, decryptPassword } from "../utils/passwordUtils";

export async function createCard(card: TypeCardData, token: string) {
  const dataUser = await jwtVerify(token);
  const cardTitleExists = await cardRepository.findByTitle(card.title);
  if (cardTitleExists) throw conflictError(`title card exists`);
  const encryptNumberCard = await cryptPassword(card.numero);
  const encryptPassword = await cryptPassword(card.password);
  const encryptCode = await cryptPassword(card.securityCode);
  const data = {
    ...card,
    numero: encryptNumberCard,
    password: encryptPassword,
    securityCode: encryptCode,
    userId: dataUser.id,
  };
  await cardRepository.insert(data);
}
export async function removeCard(id: number, token: string) {
  const dataUser = await jwtVerify(token);
  const cardExists = await cardRepository.findById(id);
  if (!cardExists) throw notFoundError(`no data in the database`);
  if (dataUser.id !== cardExists.userId)
    throw unauthorizedError(`this credential does not belong to this user`);
  await cardRepository.deleteCard(id);
}
export async function getCard(id: number, token: string) {
  const dataUser = await jwtVerify(token);
  const cardExists = await cardRepository.findById(id);
  if (dataUser.id !== id)
    throw unauthorizedError(`this credential does not belong to this user`);
  if (!cardExists) throw notFoundError(`no data in the databases`);
  const descryptNumberCard = await decryptPassword(cardExists.numero);
  const descryptPassword = await decryptPassword(cardExists.password);
  const descryptCode = await decryptPassword(cardExists.securityCode);
  const data = {
    id: cardExists.id,
    title: cardExists.title,
    userId: cardExists.userId,
    numberCard: descryptNumberCard,
    cardHolderName: cardExists.cardholderName,
    password: descryptPassword,
    securityCode: descryptCode,
    expirationDate: cardExists.expirationDate,
    isVirtual: cardExists.isVirtual,
    type: cardExists.type,
    createAt: cardExists.createdAt,
  };
  return data;
}
export async function getAllCards(token: string) {
  const dataUser = await jwtVerify(token);
  const result = await cardRepository.findAll(dataUser.id);
  const data = result.map((card) => {
    return {
      ...card,
      numero: decryptPassword(card.numero),
      securityCode: decryptPassword(card.securityCode),
      password: decryptPassword(card.password),
    };
  });
  return data;
}

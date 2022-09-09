import { ICard } from "./../types/CardTypes";
import joi from "joi";

// export const cardSchema = joi.object<ICard>({
export const cardSchema = joi.object({
  title: joi.string().max(255).required(),
  numero: joi.string().max(25).required(),
  cardholderName: joi.string().max(50).required(),
  password: joi.string().required(),
  securityCode: joi.string().max(3).required(),
  expirationDate: joi.string().max(20).required(),
  isVirtual: joi.boolean().required(),
  type: joi.string().valid("credit", "debit", "debit_credit").required(),
});

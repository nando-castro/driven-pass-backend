import { IDocument } from "./../types/DocumentTypes";
import joi from "joi";

export const documentSchema = joi.object<IDocument>({
  title: joi.string().max(255).required(),
  name: joi.string().max(50).required(),
  type: joi.string().valid("rg", "cnh").required(),
  issueDate: joi.string().max(50).required(),
  validity: joi.string().max(50).required(),
  registerNumber: joi.string().max(50).required(),
  issuer: joi.string().max(50).required(),
});

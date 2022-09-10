import { INetwork } from "./../types/NetworkTypes";
import joi from "joi";

export const networkSchema = joi.object<INetwork>({
  title: joi.string().required(),
  name: joi.string().required(),
  password: joi.string().required(),
});

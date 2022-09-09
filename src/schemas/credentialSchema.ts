import joi from "joi";

export const credentialSchema = joi.object({
  title: joi.string().min(1).required(),
  url: joi.string().uri().required(),
  userName: joi.string().min(1).required(),
  password: joi.string().min(1).required(),
});

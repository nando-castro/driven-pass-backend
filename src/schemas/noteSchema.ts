import joi from "joi";

export const noteSchema = joi.object({
  title: joi.string().min(1).max(50).required(),
  text: joi.string().min(1).max(1000).required(),
});

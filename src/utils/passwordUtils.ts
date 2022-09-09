import bcrypt from "bcrypt";
import Cryptr from "cryptr";
const cryptr = new Cryptr(`${process.env.SECRET_KEY}`);

export const cryptPassword = async (password: string) => {
  const result = cryptr.encrypt(password);
  return result;
};

export const decryptPassword = async (password: string) => {
  const result = cryptr.decrypt(password);
  return result;
};

export const hashPassword = async (password: string) => {
  const result = bcrypt.hashSync(password, 10);
  return result;
};

export const comparePassword = async (
  password: string,
  passwordCompare: string
) => {
  const result = bcrypt.compare(password, passwordCompare);
  return result;
};

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

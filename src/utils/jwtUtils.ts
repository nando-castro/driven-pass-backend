import jwt from "jsonwebtoken";

export const jwtVerify = async (token: string) => {
  const dataUser = JSON.stringify(
    jwt.verify(token, `${process.env.JWT_SECRETKEY}`)
  );
  const parsedData: { id: number } = JSON.parse(dataUser);
  return parsedData;
};

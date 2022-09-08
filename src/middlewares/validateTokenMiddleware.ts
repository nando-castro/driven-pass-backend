import { unauthorizedError } from "./../utils/errorUtils";
import { Request, Response, NextFunction } from "express";

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    throw unauthorizedError(`token not valid`);
  }
  res.locals.token = token;
  next();
}

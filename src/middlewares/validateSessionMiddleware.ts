import { jwtVerify } from "./../utils/jwtUtils";
import { formatDateNow } from "./../utils/dateUtils";
import { notFoundError, unauthorizedError } from "./../utils/errorUtils";
import { Request, Response, NextFunction } from "express";
import * as authRepository from "../repositories/authRepository";
import dayjs from "dayjs";

export async function validateSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = res.locals.token;
  const userData = await jwtVerify(token);
  const session = await authRepository.findSession(userData.id);
  if (!session) throw unauthorizedError(`session no valid`);
  const dateNow = dayjs().format("DD/MM/YYYY HH:mm:ss");
  const dateSession = formatDateNow(session.createdAt);
  if (dateNow > dateSession) throw unauthorizedError(`session expired`);
  next();
}

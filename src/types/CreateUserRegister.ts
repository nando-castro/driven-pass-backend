import { User } from "./../repositories/authRepository";

export type CreateUserRegister = Omit<User, "id">;

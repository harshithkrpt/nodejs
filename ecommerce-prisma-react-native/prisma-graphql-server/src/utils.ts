import * as jwt from "jsonwebtoken";
import { Prisma } from "./generated/prisma-client";

export interface Context {
  prisma: Prisma;
  request: any;
}

export function getUserId(ctx: Context) {
  const Authorization = ctx.request.get("Authorization");
  const token = Authorization.replace("Bearer ", "");
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
      userId: string;
    };
    return userId;
  }

  throw new AuthError();
}

export function createToken(userId: String) {
  return jwt.sign({ userId, expiresIn: "7d" }, process.env.APP_SECRET);
}

export class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

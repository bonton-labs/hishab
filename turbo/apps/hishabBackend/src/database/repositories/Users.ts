import { prismaClient } from "../postgres";
import { TRPCError } from "@trpc/server";

export class UserRepo {
  async createUser(email: string, password: string, name: string) {
    const userExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userExists) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Email has to be unique",
      });
    } else {
      const user = await prismaClient.user.create({
        data: {
          email: email,
          password: password,
          name: name,
        },
      });
      return user;
    }
  }

  async getUser(email: string, password: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
        password: password,
      },
    });

    if (user) {
      return user;
    } else {
      throw new TRPCError({
        code: "FORBIDDEN",
      });
    }
  }

  async getUserWithEmail(email: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      return user;
    } else {
      return null
    }
  }
}

export const userRepo = new UserRepo();

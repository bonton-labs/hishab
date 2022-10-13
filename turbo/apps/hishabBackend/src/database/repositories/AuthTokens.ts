import { prismaClient } from "../postgres";
import { TRPCError } from "@trpc/server";

export class AuthTokenRepo {
  async resolveToken(userId: number) {
    const authToken = await prismaClient.authToken.findFirst({
      where: {
        userId: userId,
      },
    });

    if (authToken) {
      return {
        token: authToken.id,
      };
    } else {
      const newAuthToken = await prismaClient.authToken.create({
        data: {
          userId: userId,
        },
      });
      return {
        token: newAuthToken.id,
      };
    }
  }
}

export const authTokenRepo = new AuthTokenRepo();

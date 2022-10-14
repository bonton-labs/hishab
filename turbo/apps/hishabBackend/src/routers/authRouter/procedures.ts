import { authTokenRepo } from "../../database/repositories/AuthTokens";
import { userRepo } from "../../database/repositories/Users";
import { oneTimeCodeRepo } from "../../database/repositories/OneTimeCode";
import { TRPCError } from "@trpc/server";
import { sendOneTimeCode } from "../../utils";

export async function createUser(
  email: string,
  name: string,
  password: string
) {
  const userData = await userRepo.createUser(email, password, name);
  const authToken = await authTokenRepo.resolveToken(userData.id);
  return {
    token: authToken.token,
  };
}

export async function login(email: string, password: string) {
  const userData = await userRepo.getUser(email, password);
  const authToken = await authTokenRepo.resolveToken(userData.id);
  return {
    token: authToken.token,
  };
}

export async function forgotPassword(email: string) {
  const userData = await userRepo.getUserWithEmail(email);

  if (userData) {
    const oneTimeCode = await oneTimeCodeRepo.generateCode(userData.id);
    await sendOneTimeCode(oneTimeCode.code);
  }

  return {
    msg: "If an account exists, a one time code has been sent to the provided email address",
  };
}

export async function verifyOneTimeCode(email: string, code: string) {
  const userData = await userRepo.getUserWithEmail(email);

  if (userData) {
    const oneTimeCode = await oneTimeCodeRepo.verifyCode(userData.id, code);
  } else {
    throw new TRPCError({
      code: "FORBIDDEN",
    });
  }
}

export async function resendOneTimeCode(email: string) {
  // will do later
}

export async function enterNewPassword(
  email: string,
  code: string,
  password: string
) {
  // will do later
}

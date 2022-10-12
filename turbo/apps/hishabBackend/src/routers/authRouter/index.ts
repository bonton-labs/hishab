import { createUser } from "./createUser";
import { login } from "./login";
import { forgotPassword } from "./forgotPassword";
import { resendOTP } from "./resendOTP";
import { verifyOTP } from "./verifyOTP";
import { enterNewPassword } from "./enterNewPassword";

import { z } from "zod";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const authRouter = t.router({
  createUser: t.procedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return createUser(input.email, input.name, input.password);
    }),
  login: t.procedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input }) => {
      return login(input.email, input.password);
    }),
  forgotPassword: t.procedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      return forgotPassword(input.email);
    }),
  resendOTP: t.procedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      return resendOTP(input.email);
    }),
  verifyOTP: t.procedure
    .input(z.object({ email: z.string().email(), otp: z.string() }))
    .mutation(async ({ input }) => {
      return verifyOTP(input.email, input.otp);
    }),
  enterNewPassword: t.procedure
    .input(
      z.object({
        email: z.string().email(),
        otp: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return enterNewPassword(input.email, input.otp, input.password);
    }),
});

export type AuthRouter = typeof authRouter;

import { createUser, login, forgotPassword, resendOneTimeCode, verifyOneTimeCode, enterNewPassword } from "./procedures";

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
  resendOneTimeCode: t.procedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      return resendOneTimeCode(input.email);
    }),
  verifyOneTimeCode: t.procedure
    .input(z.object({ email: z.string().email(), code: z.string() }))
    .mutation(async ({ input }) => {
      return verifyOneTimeCode(input.email, input.code);
    }),
  enterNewPassword: t.procedure
    .input(
      z.object({
        email: z.string().email(),
        code: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return enterNewPassword(input.email, input.code, input.password);
    }),
});

export type AuthRouter = typeof authRouter;

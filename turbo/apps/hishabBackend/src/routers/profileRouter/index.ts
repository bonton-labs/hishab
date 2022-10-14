import { changePassword, logout } from "./procedures";

import { z } from "zod";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const profileRouter = t.router({
  changePassword: t.procedure
    .input(
      z.object({
        oldPassword: z.string(),
        newPassword: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return changePassword(input.oldPassword, input.newPassword);
    }),
  login: t.procedure.input(z.object({})).mutation(async ({ input }) => {
    return logout();
  }),
});

export type ProfileRouter = typeof profileRouter;

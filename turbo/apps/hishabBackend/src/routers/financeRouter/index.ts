import {
  addAccount,
  editAccount,
  removeAccount,
  getAccounts,
} from "./accounts";
import {
  addTransaction,
  editTransaction,
  removeTransaction,
  getTransactions,
} from "./transactions";
import { getStats } from "./stats";

import { z } from "zod";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const financeRouter = t.router({
  addAccount: t.procedure
    .input(
      z.object({
        oldPassword: z.string(),
        newPassword: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return addAccount(input.oldPassword, input.newPassword);
    }),
  editAccount: t.procedure.input(z.object({})).mutation(async ({ input }) => {
    return editAccount();
  }),
});

export type FinanceRouter = typeof financeRouter;

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
}: trpcExpress.CreateExpressContextOptions) => {
  return {
    userId: 1,
  };
};
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const financeRouter = t.router({
  addAccount: t.procedure
    .input(
      z.object({
        accountData: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return addAccount(ctx.userId, input.accountData);
    }),
  editAccount: t.procedure
    .input(z.object({ accountId: z.number(), data: z.any() }))
    .mutation(async ({ ctx, input }) => {
      return editAccount(ctx.userId, input.accountId, input.data);
    }),
  removeAccount: t.procedure
    .input(z.object({ accountId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return removeAccount(ctx.userId, input.accountId);
    }),
  getAccounts: t.procedure.mutation(async ({ ctx }) => {
    return getAccounts(ctx.userId);
  }),
});

export type FinanceRouter = typeof financeRouter;

import { z } from "zod";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();
export const authRouter = t.router({
  createAccount: t.procedure.input(z.string()).query((req: any) => {
    console.log(req.input);
    return { id: 1, name: req.input };
  }),
  login: t.procedure
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (req: any) => {
      console.log(req.input.name);
      return { msg: `hello ${req.input.name}` };
    }),
  forgotPassword: t.procedure
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (req: any) => {
      console.log(req.input.name);
      return { msg: `hello ${req.input.name}` };
    }),
  resendOTP: t.procedure
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (req: any) => {
      console.log(req.input.name);
      return { msg: `hello ${req.input.name}` };
    }),
  verifyOTP: t.procedure
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (req: any) => {
      console.log(req.input.name);
      return { msg: `hello ${req.input.name}` };
    }),
});
export type AuthRouter = typeof authRouter;

const app = express();
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: authRouter,
    createContext,
  })
);
app.listen(4000, () => {
  console.log("Listening to port 4000!");
});

// dashboard.logout()

// dashboard.getAccounts()
// dashboard.addAccount()
// dashboard.editAccount()
// dashboard.removeAccount()

// dashboard.getStats()

// dashboard.getTransactions()
// dashboard.addTransaction()
// dashboard.editTransaction()
// dashboard.removeTransaction()

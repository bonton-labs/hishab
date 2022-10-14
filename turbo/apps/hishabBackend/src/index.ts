import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { createContext, appRouter } from "./routers";

const app = express();
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
export type AppRouter = typeof appRouter;

app.listen(4000, () => {
  console.log("Listening to port 4000!");
});

import { createTRPCRouter } from "@/server/api/trpc";
import { upload } from "@/server/api/routers/upload";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  upload,
});

// export type definition of API
export type AppRouter = typeof appRouter;

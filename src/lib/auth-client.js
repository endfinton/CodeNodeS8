import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  basePath: "/portfolio/api/auth",
});

import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import Database from "better-sqlite3";

const dbPath = process.env.PORTFOLIO_DB_PATH || "codenode.db";
const authBaseURL = getAuthBaseURL();

export const auth = betterAuth({
  database: new Database(dbPath),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: authBaseURL,
  basePath: "/api/auth",
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
  },
  plugins: [nextCookies()],
});

function getAuthBaseURL() {
  if (!process.env.BETTER_AUTH_URL) return undefined;

  try {
    return new URL(process.env.BETTER_AUTH_URL).origin;
  } catch {
    return process.env.BETTER_AUTH_URL;
  }
}

let setupPromise;

export async function ensureAuthSetup() {
  if (!setupPromise) {
    setupPromise = setupAuth();
  }

  return setupPromise;
}

async function setupAuth() {
  const context = await auth.$context;
  await context.runMigrations();

  const email = process.env.PORTFOLIO_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.PORTFOLIO_ADMIN_PASSWORD;
  const name = process.env.PORTFOLIO_ADMIN_NAME?.trim() || "Administrador";

  if (!email || !password) {
    console.warn("PORTFOLIO_ADMIN_EMAIL y PORTFOLIO_ADMIN_PASSWORD son necesarios para crear el administrador.");
    return;
  }

  const existing = await context.internalAdapter.findUserByEmail(email, {
    includeAccounts: true,
  });

  if (existing?.user) {
    const hasCredentialAccount = existing.accounts.some((account) => account.providerId === "credential");

    if (!hasCredentialAccount) {
      const hash = await context.password.hash(password);
      await context.internalAdapter.linkAccount({
        userId: existing.user.id,
        providerId: "credential",
        accountId: existing.user.id,
        password: hash,
      });
    }

    return;
  }

  const hash = await context.password.hash(password);
  const user = await context.internalAdapter.createUser({
    email,
    name,
    emailVerified: true,
  });

  await context.internalAdapter.linkAccount({
    userId: user.id,
    providerId: "credential",
    accountId: user.id,
    password: hash,
  });
}

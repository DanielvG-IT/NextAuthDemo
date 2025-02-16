import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { getUserById } from "@/data/user";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getAccountByUserId } from "@/data/account";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUserById(user.id);

      // Prevent login if email is not verified
      if (!existingUser?.emailVerified) {
        return false;
      }

      // Prevent login if TwoFactor is enabled and not confirmed
      if (existingUser.TwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) {
          return false;
        }

        // Delete TwoFactorToken for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub as string;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.twoFactorEnabled = token.twoFactorEnabled as boolean; // TODO Change to enum when adding Google Authenticator and WebAuthn
        session.user.isOauth = token.isOauth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role as UserRole;
      token.twoFactorEnabled = existingUser.TwoFactorEnabled as boolean; // TODO Change to enum when adding Google Authenticator and WebAuthn
      token.isOauth = !!existingAccount;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});

import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { db } from "@/lib/db";
// import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});

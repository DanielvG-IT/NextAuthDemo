import { UserRole } from "@prisma/client";
import { type DefaultSession, DefaultJWT } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  twoFactorEnabled: boolean;
  isOauth: boolean;
  // TODO Change to enum when adding Google Authenticator and WebAuthn
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role?: UserRole;
    twoFactorEnabled?: boolean;
    isOauth: boolean;
    // TODO Change to enum when adding Google Authenticator and WebAuthn
  }
}

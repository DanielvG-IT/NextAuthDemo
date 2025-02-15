"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const verifyEmail = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  const hasExpired = new Date() > new Date(existingToken.expiresAt);

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  // TODO: Uncomment this block of code to prevent users from verifying their email multiple times.
  // if (existingUser.emailVerified) {
  //   return { error: "Email already verified!" };
  // }

  await db.user.update({
    where: { email: existingToken.email },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified!" };
};

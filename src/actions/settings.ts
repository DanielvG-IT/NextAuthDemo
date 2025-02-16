"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { SettingsSchema } from "@/schemas";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail, getUserById } from "@/data/user";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "You must be logged in to update your profile" };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "You must be logged in to update your profile" };
  }

  if (user.isOauth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.TwoFactorEnabled = undefined;

    // Redundant code since Prisma (ORM) will ignore fields set to undefined
    // delete values.email;
    // delete values.password;
    // delete values.newPassword;
    // delete values.TwoFactorEnabled;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      success:
        "Email updated successfully. Please verify your new email address",
    };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatches = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatches) {
      return { error: "Incorrect password" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;

    values.newPassword = undefined;
    // delete values.newPassword; Redundant code since Prisma (ORM) will ignore fields set to undefined
  }

  await db.user.update({
    where: { id: user.id },
    data: { ...values },
  });

  return { success: "Profile updated successfully" };
};

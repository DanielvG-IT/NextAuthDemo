import { db } from "@/lib/db";

export const getAccountByUserId = async (userId: string) => {
  try {
    const user = await db.account.findFirst({
      where: { userId },
    });
    return user;
  } catch {
    return null;
  }
};

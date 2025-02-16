"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  // Some Server Stuff before logout
  await signOut();
};

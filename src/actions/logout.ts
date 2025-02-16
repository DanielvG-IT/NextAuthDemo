"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  // TODO Some Server Stuff before logout
  await signOut();
};

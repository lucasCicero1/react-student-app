"use server";

import { getUser } from "@/src/lib/db";

export async function getUserFromDb(email: string): Promise<any[]> {
  const user = await getUser(email);

  return user;
}

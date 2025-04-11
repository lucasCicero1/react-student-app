"use server";

import { getUser, createUser } from "@/src/lib/db";

export async function registerUser(
  name: string,
  email: string,
  password: string,
): Promise<any[] | null> {
  const user = await getUser(email);

  if (user.length) return user;

  await createUser(name, email, password);

  return null;
}

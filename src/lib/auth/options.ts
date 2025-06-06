import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";

import { getUser } from "@/src/lib/db";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ email, password }: any) {
        const user = await getUser(email);

        if (!user.length) return null;
        const passwordsMatch = await compare(password, user[0].password!);

        if (passwordsMatch) return user[0] as any;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
};

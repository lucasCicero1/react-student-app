import NextAuth from "next-auth";

import { nextAuthOptions } from "@/src/lib/auth/options";

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };

import { JwtPayload } from "jsonwebtoken";

import ConfirmClient from "./confirmClient";

import { JWTToken } from "@/src/shared/jwt-token";
import { mailTokenSecret } from "@/src/config/configs";
import { activeUser } from "@/src/lib/db";

export default async function ConfirmPage(props: any) {
  const token = props?.searchParams?.token;

  const decryptedToken = await JWTToken.decrypt({
    token: token ?? "",
    secret: mailTokenSecret,
  });

  const email = (decryptedToken as JwtPayload)?.email ?? null;

  if (email) await activeUser(email);

  return <ConfirmClient email={email} />;
}

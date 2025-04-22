import { JwtPayload } from "jsonwebtoken";

import ConfirmClient from "./confirmClient";

import { JWTToken } from "@/src/shared/jwt-token";
import { mailTokenSecret } from "@/src/config/configs";

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const param = await searchParams;
  const token = param?.token;
  const decryptedToken = await JWTToken.decrypt({
    token: token ?? "",
    secret: mailTokenSecret,
  });

  const email = (decryptedToken as JwtPayload)?.email ?? null;

  return <ConfirmClient email={email} />;
}

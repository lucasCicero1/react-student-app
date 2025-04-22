const mailTokenSecret = process.env.MAIL_TOKEN_SECRET ?? "MAIL_SECRET";

const mailTokenConfig = {
  algorithm: "HS256",
  expiresIn: "1h",
} as const;

export { mailTokenSecret, mailTokenConfig };

"use server";

import { Resend } from "resend";

import { getUser, createUser } from "@/src/lib/db";
import { JWTToken } from "@/src/shared/jwt-token";
import { mailTokenSecret, mailTokenConfig } from "@/src/config/configs";

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

export async function sendEmailConfirmation(
  email: string,
  name: string,
): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const token = JWTToken.encrypt({
    value: { email, name },
    secret: mailTokenSecret,
    config: mailTokenConfig,
  });

  const confirmUrl = `${process.env.NEXT_PUBLIC_APP_URL}/confirm?token=${token}`;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [email],
      subject: "Confirme seu e-mail",
      html: `
            <h1>Olá, ${name}!</h1>
            <p>Obrigado por se cadastrar. Clique no botão abaixo para confirmar seu e-mail:</p>
            <a href="${confirmUrl}" style="background:#6366f1;color:white;padding:10px 20px;border-radius:5px;text-decoration:none;">Confirmar E-mail</a>
            <p>Ou copie e cole o link no navegador: ${confirmUrl}</p>
          `,
    });
  } catch (error) {
    console.error(error);
  }
}

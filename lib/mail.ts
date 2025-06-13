import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetPasswordEmail(email: string, token: string){
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "Reanimate <onboarding@resend.dev>",
    to: email,
    subject: "Reset your password",
    html: `
      <p>Click <a href="${confirmLink}">here</a> to reset your password</p>
    `,
  });
}

export async function sendVerificationEmail(email: string, token: string){
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "Reanimate <onboarding@resend.dev>",
    to: email,
    subject: "Verify your email",
    html: `
      <p>Click <a href="${confirmLink}">here</a> to confirm your email</p>
    `,
  });
}
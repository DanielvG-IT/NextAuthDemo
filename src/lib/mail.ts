import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const publicUrl = process.env.PUBLIC_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${publicUrl}/auth/verify-email?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email address",
    html: `<p>Click <a href="${confirmationLink}">here</a> to verify your email address.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const ResetPasswordLink = `${publicUrl}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${ResetPasswordLink}">here</a> to reset your password.</p>`,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Login 2FA Code",
    html: `<p>Your two-factor authentication token is: <strong>${token}</strong></p>`,
  });
};

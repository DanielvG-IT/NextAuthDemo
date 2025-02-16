import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const publicUrl = process.env.NEXT_PUBLIC_APP_URL;
const verifyEmailFromEmail = process.env.VERIFY_MAIL_FROM_ADDRESS;
const passwordResetFromEmail = process.env.RESET_PASSWORD_MAIL_FROM_ADDRESS;
const twoFactorTokenFromEmail = process.env.TWOFACTORTOKEN_MAIL_FROM_ADDRESS;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${publicUrl}/auth/verify-email?token=${token}`;

  await resend.emails.send({
    from: `${verifyEmailFromEmail}`,
    to: email,
    subject: "Verify your email address",
    html: `<p>Click <a href="${confirmationLink}">here</a> to verify your email address.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const ResetPasswordLink = `${publicUrl}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: `${passwordResetFromEmail}`,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${ResetPasswordLink}">here</a> to reset your password.</p>`,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: `${twoFactorTokenFromEmail}`,
    to: email,
    subject: "Login 2FA Code",
    html: `<p>Your two-factor authentication token is: <strong>${token}</strong></p>`,
  });
};

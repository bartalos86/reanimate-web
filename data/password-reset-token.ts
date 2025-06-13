import { prisma } from "@/prisma";


export async function getPasswordResetTokenByToken(token: string) {
  try {
    const passwordToken = await prisma.passwordResetToken.findUnique({
      where: {token}
    });

    return passwordToken;
  } catch {
    return null;
  }
}

export async function getPasswordResetTokenByEmail(email: string) {
  try {
    const passwordToken = await prisma.passwordResetToken.findFirst({
      where: {email}
    });

    return passwordToken;
  } catch {
    return null;
  }
}
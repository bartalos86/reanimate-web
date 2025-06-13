"use server"
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { prisma } from "@/prisma";

export async function newVerification(token: string) {

  const verificationToken = await getVerificationTokenByToken(token);

  if(!verificationToken) {
    return {error: "Invalid token"}
  }

  const hasExpired = new Date() > verificationToken.expires;
  if(hasExpired) {
    return {error: "Token has expired"}
  }

  const user = await getUserByEmail(verificationToken.email);

  if(!user) {
    return {error: "User not found"}
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: new Date(),
      email: verificationToken.email,
    },
  });

  await prisma.verificationToken.delete({
    where: {
      id: verificationToken.id,
    },
  });

  return {success: "Email verified"}
}
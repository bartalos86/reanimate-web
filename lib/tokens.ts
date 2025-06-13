import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';
import { getVerificationTokenByEmail } from '@/data/verification-token';
import { prisma } from '@/prisma';
import { v4 as uuidv4 } from 'uuid';


export async function generatePasswordResetToken(email: string){
  const token = uuidv4();
  const expires = new Date(Date.now() + 1000 * 60 * 60);
  const existingToken = await getPasswordResetTokenByEmail(email);


  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const resetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return resetToken;
}

export async function generateVerificationToken(email: string) {

  const token = uuidv4();
  const expires = new Date(Date.now() + 1000 * 60 * 60);
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
}
"use server"
import { z } from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { prisma } from "@/prisma";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log(values)
  const validatedFields = await RegisterSchema.safeParseAsync(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const {email, password, lastName, firstName, agreeToTerms} = validatedFields.data;
  console.log(email)

  if(!agreeToTerms){
    return {error: "You have to agree to the terms of use!"}
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const name = `${firstName} ${lastName}`;
  console.log(hashedPassword)

  const existingUser = await getUserByEmail(email);
  console.log("EXISTING: ", existingUser)


  if(existingUser){
    return {error: "Email already exists!"}
  }

   await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {success: "Confirmation email sent!"}
};

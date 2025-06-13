"use server";

import { getUserById } from "@/data/user";
import { getCurrentUser } from "@/lib/user";
import { prisma } from "@/prisma";
import { ProfileFormSchema, ProfileFormValues } from "@/schemas";

export async function updateProfileInfo(values: ProfileFormValues) {
  const validatedFields = ProfileFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Name not valid!" };
  }

  const { name } = validatedFields.data;

  const user = await getCurrentUser();

  if (!user) return { error: "User not logged in!" };

  const dbUser = await getUserById(user.id as string);
  const dbAccount = await prisma.account.findFirst({
    where: { userId: user.id as string },
  });

  if (!dbUser) return { error: "User not found!" };

  if (dbAccount && dbAccount.type === "oauth") {
    return { error: "The credetials for this account cannot be modified" };
  }

  await prisma.user.update({
    where: {
      id: user.id as string,
    },
    data: {
      name,
    },
  });

  return {success: "Profile succesfully updated!"}
}

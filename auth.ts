import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas"
import { getUserByEmail, getUserById } from "@/data/user"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {strategy: "jwt"},
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  events: {
    async linkAccount({user}) {
      await prisma.user.update({where: {
        id: user.id
      }, data: {emailVerified: new Date()}})
    }
  },
  callbacks: {
    async signIn({user, account}){
     if(account?.provider !== "credentials") return true;

     const existingUser = await getUserById(user.id!);

     if(existingUser?.emailVerified) return false;

     //TODO: ADD TWO FACTOR AUTHENTICATION

     return true;
    },
    async session({token, session}){
        if(token.sub && session.user){
          session.user.id = token.sub;
        }

        return session;
    },
    async jwt({token}){
      if(!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      //here add additional info to token which can be used in session

      return token;
    }
  },
  providers: [Credentials({
        async authorize(credentials) {
          const validatedFields = LoginSchema.safeParse(credentials);

          if(validatedFields.success){
            const {email, password} = validatedFields.data;

            const user = await getUserByEmail(email);
            //User logged in though other providers
            if(!user || !user.password) return null;

            const passwordsMatch = await bcrypt.compare(
              password,
              user.password
            )

            if(passwordsMatch) return user;
          }
          return null;
        }
  }),GitHub({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  }), Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })],
})
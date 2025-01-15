import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        // Prisma query to retrieve the user by email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email || "",
          },
        });

        // If user is not found, return null
        if (!user) {
          return null;
        }

        // Password comparison
        const passwordCorrect = await compare(
          credentials?.password || "",
          user.password
        );

        // If the password is correct, return the user
        if (passwordCorrect) {
          return {
            id: String(user.id),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          };
        }

        // If password is incorrect, return null
        return null;
      },
    }),
  ],
  // Customize callbacks to add user information to the session
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.firstName = (user as any).firstName;
        token.lastName = (user as any).lastName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  }
}

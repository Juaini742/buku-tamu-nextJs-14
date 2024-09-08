import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt-ts";
import { DefaultSession, DefaultUser, JWT, Session, User } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id?: string;
    username?: string;
    email?: string;
    role?: string;
  }

  interface Session extends DefaultSession {
    user: User;
  }

  interface JWT {
    id?: string;
    username?: string;
    email?: string;
    role?: string;
    created_at?: string;
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.users.findFirst({
          where: { email: credentials.email },
        });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            id: user.id,
            email: user.email,
            role: user.role,
            createdAt: user.created_at,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  cookies: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.role) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/error",
  },
};

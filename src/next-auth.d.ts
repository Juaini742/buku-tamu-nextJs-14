/* eslint-disable @typescript-eslint/no-unused-vars */
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "GUEST";
  username: string;
  created_at: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "GUEST";
    username: string;
    created_at: string;
  }
}

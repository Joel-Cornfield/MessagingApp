import NextAuth from "next-auth/next";
import { userProps } from "./types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | undefined;
      avatarUrl: string | undefined;
      username: string | undefined;
      email: string | undefined;
    };
  }
}
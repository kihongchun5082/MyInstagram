import { AuthUser } from "@/model/user";
// import NextAuth, { DefaultSession } from "next-auth/next";

declare module 'next-auth' {
  interface Session {
    user: AuthUser
    // user: {
    //   username: string
    // } & DefaultSession['user']
  }
}
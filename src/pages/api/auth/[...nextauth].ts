import { signIn } from 'next-auth/react';
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { addUser } from '@/service/user';

export const authOptions: NextAuthOptions= {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user: { id, name, email, image } }) {
      // console.log('signInUser:', { id, name, email, image })
      if (!email) {
        return false
      }
      addUser({
        id,
        name: name || '',
        image,
        email,
        username: email.split('@')[0],
      });
      return true
    },
    async session({ session, token }) {
      const me = session?.user
      if (me) {
        session.user = {
          ...me,
          username: me.email?.split('@')[0] || '',
          id: token.id as string
        }
      // console.log('session.user;', session.user)
      // console.log('session의 user;', user)
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    }
  },

  pages: {
    signIn: '/auth/signin',
  }
}
// console.log(authOptions.providers)
export default NextAuth(authOptions)
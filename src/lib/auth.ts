import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import type { NextAuthOptions } from "next-auth";

interface AuthUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/signup" },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.user = {
          name: profile.name || "",
          email: profile.email || "",
          provider: account.provider,
        } as AuthUser;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) session.user = token.user as AuthUser;
      return session;
    },
  },
};

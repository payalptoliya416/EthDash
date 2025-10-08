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
  profile(profile) {
    return {
      id: profile.id,
      name: profile.name,
      email: profile.email || "", // fallback empty string
      image: profile.picture?.data?.url || "",
    };
  },
  authorization: {
    params: {
      scope: "email,public_profile",
      fields: "id,name,email,picture",
    },
  },
}), 
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 }, // 30 days
  pages: { signIn: "/" },
  callbacks: {
    async signIn({ user, account, profile }) {
      return true; // Always allow sign in
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.user = {
          name: profile.name || "",
          email: profile.email || "",
          provider: account.provider,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) session.user = token.user as AuthUser;
      return session;
    },
  },
};
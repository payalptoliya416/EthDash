import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import type { NextAuthOptions } from "next-auth";

// Define a type for the user stored in JWT and session
interface AuthUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export const authOptions:NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      profile(profile) {
        // Map Facebook profile to our user type
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signup",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return "/overview"; // redirect after login
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.user = {
          name: profile.name || "",
          email: profile.email || "",
        } as AuthUser;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as AuthUser; // properly typed
      }
      return session;
    },
  },
};

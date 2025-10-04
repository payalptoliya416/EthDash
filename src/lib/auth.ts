import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import type { NextAuthOptions } from "next-auth";

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
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signup", 
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return "/overview"; 
    },
    async jwt({ token, account, profile }) {
      // Include profile info in token if available
      if (account && profile) {
        token.user = {
          name: profile.name || "",
          email: profile.email || "",
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Make sure session.user contains name/email
      if (token.user) {
        session.user = token.user as any;
      }
      return session;
    },
  },
};

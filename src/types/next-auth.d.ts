import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: string; // ✅ add this line
    } & DefaultSession["user"];
  }

  interface JWT {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: string; // ✅ include provider here too
    };
  }
}

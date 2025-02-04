import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

// Add type safety
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      console.log("JWT callback:", { token, user });
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      console.log("Session callback:", { session, token });
      session.user.id = token.id as string;
      return session;
    },
    redirect() {
      return "/";
    },
  },
});

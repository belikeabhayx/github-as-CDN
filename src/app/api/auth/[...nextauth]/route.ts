import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

// Add type safety
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
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
      clientId: process.env.GITHUB_APP_CLIENT_ID!,
      clientSecret: process.env.GITHUB_APP_CLIENT_ACCESS_TOKEN!,
      authorization: {
        params: {
          scope: "repo read:user user:email",
        },
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user, account, profile, session }) {
      if (profile && profile.id) {
        token.githubId = profile.id;
      }
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      console.log("JWT callback:", token);
      return token;
    },
    session({ session, token }) {
      console.log("Session callback:", { session, token });
      session.user = {
        ...session.user,
        id: token.githubId as string,
      }
      session.sessionToken = token.accessToken as string;
     
      return session;
    },
    redirect() {
      return "/";
    },
  },
});

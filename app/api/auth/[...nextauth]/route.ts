import SignToken from "@/app/utils/signToken";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      // Possibility to check for information of the user and really look for authorization
      console.log(user, account)
      return true;
    },
    async jwt({ token, user, account }: any) {
      // Create the token
      console.log(user, token, account);
      if (account) {
        const signedToken = await SignToken(user?.email as string);
        token.userToken = signedToken;
      }
      return token;
    },
    async session({ session, token, user }: any) {
      // Save the token in session
      session.loggedUser = token.userToken;
      return session;
    },
  },
})

export { handler as GET, handler as POST }
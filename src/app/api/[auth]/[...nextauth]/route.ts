import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { userExists,createUser } from "@/lib/actions/user.actions";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    })
  ],
    callbacks: {
      async jwt({ token ,user}:{token : any,user:any}) {
        // save the username
        // console.log("user1",user);
        
        if (token) {
          token.username = token.email.split("@")[0]
          const fname = token.name.split(" ")[0]
          // format the name properly
          token.fname = fname[0].toUpperCase() + fname.slice(1).toLowerCase()
        }
        return token
      },
      async session({ session, token}:{session:any,token:any}) {
        session.username = token.username
        session.fname = token.fname
        session.bio = ''
        let id = await userExists(token.username);
        if (id==null) {
          id = await createUser({ username: session.username, name: session.fname, dp: token.picture })
        }
        session.id = id;
        return session
      }
    },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
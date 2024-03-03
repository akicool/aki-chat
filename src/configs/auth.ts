import type { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcrypt";

interface IUser {
  email: string;
  password: string;
}

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     // username: { label: "Username", type: "text", placeholder: "jsmith" },
    //     // password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

    //     return user;
    //     // if (user) {
    //     //   return user;
    //     // } else {
    //     //   return null;
    //     // }
    //   },
    // }),
    // CredentialsProvider({
    //   name: "credentials",
    //   credentials: {
    //     email: { label: "email", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     // const { email, password }: IUser = credentials;
    //     const email = 'www'
    //     try {
    //       await connectDB();
    //       const user = await User.findOne({ email });
    //       console.log(user);
    //       if (!user) return null;

    //       // const passwordMatch = await bcrypt.compare(password, user.password);

    //       // if (!passwordMatch) return null;
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   },
    // }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        try {
          await connectDB();
          const user = await User.findOne({ email });
          if (!user) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          console.log(user, passwordMatch);

          return passwordMatch ? user : null;
        } catch (e) {
          console.log(e);
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

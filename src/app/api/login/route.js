import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import bcrypt from "bcrypt";

import { User } from "@/models/User";

import connectDB from "../../../lib/mongodb";

export async function POST(req, res) {
  try {
    connectDB();
    const request = await req.json();
    const { email, password } = request;
    const isUserPersent = await User.findOne({ email });
    const hashPassword = await bcrypt.hash(password, 10);

    const secret = process.env.NEXTAUTH_SECRET;

    if (!email || !password) {
      return new Response(
        JSON.stringify({
          message: "invalid credentials",
          data: false,
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    if (!isUserPersent) {
      return new Response(
        JSON.stringify({
          message: "invalid credentials",
          data: false,
        }),
        {
          status: 409,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
    const isMatch = await bcrypt.compare(password, isUserPersent.password);

    try {
      const username = isUserPersent.username;
      const user = new User({ email, password: hashPassword });
      await user.save();
      const token = await getToken({ username, secret });
      console.log("JSON Web Token", token);
      const response = NextResponse.json(
        { message: "User successfully" },
        { status: 201 },
      );
      response.cookies.set("token", token);
      return response;
    } catch (e) {
      console.log(e);

      return new Response(
        JSON.stringify({
          message: "Error",
          data: false,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // return new Response(
    //   JSON.stringify({
    //     message: "Complete",
    //     data: request,
    //   }),
    //   {
    //     status: 200,
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   },
    // );
  } catch (e) {
    console.log(e);

    return new Response(
      JSON.stringify({
        message: "Error",
        data: false,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

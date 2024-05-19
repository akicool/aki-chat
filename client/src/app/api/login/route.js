import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";
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
    console.log(isUserPersent, hashPassword);

    // const secret = process.env.NEXTAUTH_SECRET;

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
    // const isMatch = await bcrypt.compare(password, isUserPersent.password);

    try {
      const username = isUserPersent.username;
      const token = jwt.sign({ username, email }, process.env.JWTKEY_SECRET);
      console.log("JSON Web Token", token);
      const response = NextResponse.json(
        { message: "User successfully", username, email },
        { status: 201 },
      );
      response.cookies.set("access-token", token);
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

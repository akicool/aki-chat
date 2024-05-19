import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "@/models/User";

import connectDB from "../../../lib/mongodb";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    connectDB();

    const cookiesStore = cookies();
    const accessTokenFromCookies = cookiesStore.get("access-token")?.value;
    const { username, email } = jwt.verify(
      accessTokenFromCookies,
      process.env.JWTKEY_SECRET,
    );

    return new Response(
      JSON.stringify({
        message: "Get user",
        username,
        email,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
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

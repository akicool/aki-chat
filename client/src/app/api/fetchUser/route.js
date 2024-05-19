import { NextResponse } from "next/server";

import { User } from "@/models/User";

import connectDB from "../../../lib/mongodb";

export async function POST(req) {
  try {
    connectDB();
    const request = await req.json();
    const localID = JSON.parse(request.localID);
    const { username, email } = await User.findOne({ _id: localID });

    try {
      const response = NextResponse.json(
        { message: "Fetch user", user: { username, email } },
        { status: 200 },
      );
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

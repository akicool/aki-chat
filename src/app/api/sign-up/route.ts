import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "@/models/User";

import connectDB from "../../../lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();
    const request = await req.json();
    const { username, email, password } = request;
    const isUserPersent = await User.findOne({ email }).select("_id");
    const hashPassword = await bcrypt.hash(password, 10);

    console.log(request);

    if (!username || !email || !password) {
      return NextResponse.json({ message: "Ivalid data" }, { status: 400 });
    }

    if (isUserPersent) {
      return NextResponse.json(
        { message: "User is alredy present", data: false },
        { status: 409 },
      );
    }

    try {
      const user = new User({ email, username, password: hashPassword });
      await user.save();

      const token = jwt.sign({ username, email }, "key");
      console.log("JSON Web Token", token);
      const response = NextResponse.json(
        { message: "User saved successfully", user },
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
  } catch (e) {
    console.log(e);
    // return NextResponse.json({ message: e }, { status: 500 });
    return new Response(
      JSON.stringify({
        message: e,
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

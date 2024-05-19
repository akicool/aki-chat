import connectDB from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET(req, res) {
  connectDB();
  const getAllUsers = await User.find();

  try {
    return new Response(
      JSON.stringify({
        message: "Get all users",
        getAllUsers,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: { Error: err },
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

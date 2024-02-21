import { Server, Socket } from "socket.io";

export async function POST(req, res) {
  try {
    const request = await req.json();

    return new Response(
      JSON.stringify({
        message: "Complete",
        data: request,
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

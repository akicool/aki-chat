import { serve } from "https://deno.land/std@0.150.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";
// import connectDB from "/client/src/lib/mongodb.ts";
// import { User } from "@/models/User";

const io = new Server({
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);

  socket.on("send_message", (data) => {
    // socket.emit("send_message", data);
    io.emit("send_message", data, console.log(data));
  });

  socket.on("disconnect", (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });
});

await serve(io.handler(), {
  port: 3001,
});

"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";
import { v4 as uuid } from "uuid";

import { Input } from "@/components/Inputs/Input";
import { $user } from "@/store/user";

type Message = {
  id: string;
  message: string;
  username: string | undefined;
};

export const ConversationView = () => {
  const socket = io("http://localhost:3001");
  const [messageField, setMessageField] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [user] = useAtom($user);
  const session = useSession();

  const handleSendMessage = () => {
    if (messageField.trim() !== "") {
      setMessageField("");
      socket.emit("send_message", {
        message: messageField,
        username: session?.data?.user?.name || user?.username,
      });
    }
  };

  useEffect(() => {
    socket.on("send_message", (data: Message) => {
      setMessages([
        ...messages,
        {
          id: uuid(),
          message: data?.message,
          username: data?.username,
        },
      ]);
    });

    // return () => {
    //   socket.off("send_message");
    // };
  }, [messages]);

  return (
    <>
      <div className="grid h-full w-full items-end">
        <div className=" h-fit w-full overflow-hidden">
          {messages.map(({ id, message, username }) => (
            <div key={id} className=" flex w-full justify-between">
              {message} {username}
            </div>
          ))}
        </div>
        <Input
          messageField={messageField}
          onChange={(e) => setMessageField(e.target.value)}
          onClick={handleSendMessage}
        />
      </div>
    </>
  );
};

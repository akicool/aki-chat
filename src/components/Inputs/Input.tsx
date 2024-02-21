import { useState } from "react";
import { IconSend } from "@tabler/icons-react";
import clsx from "clsx";

import { useSendMessage } from "@/store";

import { Button } from "../Buttons/Button";

type Props = {
  onUpdateMessage: Promise<void>;
};

export const Input = ({ onUpdateMessage }: Props) => {
  //   const firstName = useSendMessage((state) => state.message);
  const sendMessage = useSendMessage((state) => state.updateMessage);

  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      sendMessage(message);
      setMessage("");
      onUpdateMessage;
    }
  };

  return (
    <>
      <div className="flex w-full justify-center gap-3 px-3 py-3">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-4/5 bg-transparent"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />

        <button
          className={clsx(
            "btn btn-active btn-accent w-git h-fit rounded-full opacity-0 transition duration-300",
            message.trim() != "" && "opacity-100",
          )}
          onClick={handleSendMessage}
        >
          <IconSend />
        </button>
      </div>
    </>
  );
};

import { Input } from "@/components/Inputs/Input";
import React from "react";

type Props = {
  message: string;
  onUpdateMessage: Promise<void>;
};

const MainConversation = ({ message, onUpdateMessage }: Props) => {
  return (
    <>
      <div className="grid h-full w-full items-end">
        {message}
        <Input onUpdateMessage={onUpdateMessage} />
      </div>
    </>
  );
};

export default MainConversation;

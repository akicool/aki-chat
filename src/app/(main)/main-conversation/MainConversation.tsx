import { Input } from "@/components/Inputs/Input";
import React from "react";

type Props = {
  // message: string;
  // onUpdateMessage: Promise<void>;
};

const MainConversation = (props: Props) => {
  return (
    <>
      <div className="grid h-full w-full items-end">
        <Input />
      </div>
    </>
  );
};

export default MainConversation;

"use client";
import React, { useEffect, useState } from "react";
import MainConversation from "./MainConversation";
import { useSendMessage } from "@/store";

type Props = {};

const MainConversationPage = (props: Props) => {
  const [getMessage, setGetMessage] = useState("");
  const firstName = useSendMessage((state) => state.message);

  // const onSendMessage = async (value = "info") => {
  //   const res = await fetch("/api/socket", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(value),
  //   });
  //   return res.json();
  // };

  // const onUpdateMessage = async () => {
  //   try {
  //     const { data } = await onSendMessage(firstName);

  //     if (data) {
  //       setGetMessage(data);
  //       console.log(data, firstName);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const onUpdateMessage = async () => {
    // console.log(12);
  };

  //TODO: added spin animation in process loading
  useEffect(() => {
    onUpdateMessage();
  }, []);

  return (
    <>
      <div className="h-full w-full">
        <MainConversation
          message={getMessage}
          onUpdateMessage={onUpdateMessage()}
        />
      </div>
    </>
  );
};

export default MainConversationPage;

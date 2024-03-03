"use client";

import React from "react";

import MainConversation from "./MainConversation";

type Props = {};

const MainConversationPage = (props: Props) => {
  return (
    <>
      <div className="h-full w-full">
        <MainConversation />
      </div>
    </>
  );
};

export default MainConversationPage;

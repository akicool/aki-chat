"use client";

import MainConversation from "./MainConversation";

type Props = {};

const MainConversationPage = async (props: Props) => {
  return (
    <>
      <div className="h-full w-full">
        <MainConversation />
      </div>
    </>
  );
};

export default MainConversationPage;

"use client";

import React, { useEffect } from "react";
import { Input } from "@/components/Inputs/Input";
import { $user } from "@/store/user";
import axios from "axios";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";

interface IUserData {
  username: string;
  email: string;
}

type Props = {
  userData?: void | IUserData;
};

const MainConversation = (props: Props) => {
  const [user, setUser] = useAtom($user);
  const session = useSession();

  return (
    <>
      <div className="grid h-full w-full items-end">
        search
        {/* <Input /> */}
      </div>
    </>
  );
};

export default MainConversation;

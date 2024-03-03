"use client";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import { useAtom } from "jotai";

import { $user } from "@/store/user/store";

import clsx from "clsx";
import {
  IconLogin2,
  IconLogout2,
  IconPlus,
  IconSettings,
} from "@tabler/icons-react";
import { Avatar } from "@mantine/core";

import { Button } from "./Buttons/Button";

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  children?: ReactNode;
};

export const Sidebar = ({ children }: Props) => {
  const session = useSession();

  const [user, setUser] = useAtom($user);

  const fetchUser = async (localID: string) => {
    try {
      axios
        .post("/api/fetchUser", { localID })
        .then((response) => {
          setUser(response?.data?.user);
          console.log(user, response?.data?.user);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const localID = localStorage.getItem("id");

    if (localID) {
      (async () => fetchUser(localID))();
    }
  }, []);

  return (
    <>
      <aside className="flex h-full w-full max-w-sm flex-col justify-between space-y-3 border-r-2 border-solid border-[#B3B3B3] px-8 py-9">
        <div
          className={clsx(
            "grid gap-3 transition duration-200",
            session?.data || user || "pointer-events-none blur-sm",
          )}
        >
          <Button className="self">
            <IconPlus />
            Start new chat
          </Button>
          {children}
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-4">
          {session?.data || user ? (
            <>
              <div className="flex w-full items-center gap-2">
                <Avatar radius="xl" src={session.data?.user?.image} />
                <div className="">
                  <p className="text-sm">
                    {session.data?.user?.name || user?.username}
                  </p>
                  <p className="text-sm text-gray-500">
                    {session.data?.user?.email || user?.email}
                  </p>
                </div>
              </div>
            </>
          ) : null}
          {/* {session.data && <NextLink href={"/profile"}>Profile</NextLink>} */}
          {session.data || user ? (
            <NextLink
              href={"/"}
              className="btn btn-outline btn-error flex w-full items-center gap-2"
              onClick={() => {
                signOut({ callbackUrl: "/" }), localStorage.clear();
              }}
            >
              Sign Out <IconLogout2 />
            </NextLink>
          ) : (
            <NextLink
              href={"/sign-up"}
              className="btn btn-outline btn-accent flex w-full"
            >
              Sign In
              <IconLogin2 />
            </NextLink>
          )}
        </div>
      </aside>
    </>
  );
};

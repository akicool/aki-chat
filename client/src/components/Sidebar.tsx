"use client";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import { useAtom } from "jotai";

import { $user, $userLoader } from "@/store/user";

import clsx from "clsx";
import { IconLogin2, IconLogout2, IconPlus } from "@tabler/icons-react";
import { Avatar, Modal } from "@mantine/core";

import { Button } from "./Buttons/Button";
import { useDisclosure } from "@mantine/hooks";
import { UserSearchPanel } from "./UserSearchPanel";
import { spotlight } from "@mantine/spotlight";

interface IUserData {
  username: string;
  email: string;
}

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  children?: ReactNode;
  userData?: void | IUserData;
};

export const Sidebar = ({ children }: Props) => {
  const session = useSession();
  const [opened, { open, close }] = useDisclosure(false);

  const [user] = useAtom($user);
  const [loading] = useAtom($userLoader);

  return (
    <>
      <aside className="flex h-full w-full max-w-sm flex-col justify-between space-y-3 border-r-2 border-solid border-[#B3B3B3] px-8 py-9">
        <div
          className={clsx(
            "grid gap-3 transition duration-200",
            session?.data || user || "pointer-events-none blur-sm",
          )}
        >
          {/* <Button className="self" onClick={open}>
            <IconPlus />
            Start new chat
          </Button> */}
          <Button className="self" onClick={spotlight.open}>
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
          {/* {session.data && user && <NextLink href={"/profile"}>Profile</NextLink>} */}
          {session?.data || user ? (
            <NextLink
              href={"/"}
              className="btn btn-outline btn-error flex w-full items-center gap-2"
              onClick={() => {
                signOut({ callbackUrl: "/" }), Cookies.remove("access-token");
              }}
            >
              Sign Out <IconLogout2 />
            </NextLink>
          ) : (
            <>
              {loading ? (
                <>
                  <div className="flex w-full items-center justify-between gap-2">
                    <span className="loader"></span>
                    <div className="grid w-4/5 space-y-3">
                      <div className="h-3 w-full animate-pulse rounded-xl bg-slate-300"></div>
                      <div className="h-3 w-full animate-pulse rounded-xl bg-slate-300"></div>
                    </div>
                  </div>
                  <div className="btn btn-outline w-full animate-pulse bg-slate-300"></div>
                </>
              ) : (
                <NextLink
                  href={"/sign-up"}
                  className="btn btn-outline btn-accent flex w-full"
                >
                  Sign In
                  <IconLogin2 />
                </NextLink>
              )}
            </>
          )}
        </div>
      </aside>
      {/* <UserSearchPanel opened={opened} close={close} /> */}
      <UserSearchPanel />
    </>
  );
};

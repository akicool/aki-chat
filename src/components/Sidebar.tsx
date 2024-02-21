"use client";
import { IconPlus, IconSettings } from "@tabler/icons-react";
import { MouseEventHandler, ReactNode } from "react";

import { Button } from "./Buttons/Button";
import { Avatar } from "@mantine/core";

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  children?: ReactNode;
};

export const Sidebar = ({ children }: Props) => {
  return (
    <>
      <aside className="flex h-full w-full max-w-sm flex-col justify-between space-y-3 border-r-2 border-solid border-[#B3B3B3] px-8 py-9">
        <div className="grid gap-3">
          <Button className="self">
            <IconPlus />
            Start new chat
          </Button>
          {children}
        </div>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Avatar radius="xl" />
            <p>Katy Johnston</p>
          </div>
          <button>
            <IconSettings />
          </button>
        </div>
      </aside>
    </>
  );
};

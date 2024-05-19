"use client";
import { Tabs } from "@mantine/core";
import React, { ReactNode } from "react";
import { IconMessage } from "@tabler/icons-react";
import { Sidebar } from "./Sidebar";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return <>{children}</>;
};

export default Layout;

"use client";
import React, { ReactNode } from "react";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import NextImage from "next/image";

import {
  IconPlus,
  IconPhoto,
  IconMessageCircle,
  IconSettings,
  IconHistory,
  IconGenderThird,
  IconBookmark,
} from "@tabler/icons-react";

import "@mantine/core/styles.css";
import { Tabs } from "@mantine/core";
import { MantineProvider } from "@mantine/core";

import Layout from "@/components/layout";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

type Props = {
  children?: ReactNode;
};

const App = ({ children }: Props) => {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();

  const goToLink = (value: string) => {
    router.push(value);
  };

  return (
    <>
      <MantineProvider>
        <div className="h-screen w-full">
          <Header />
          <Tabs className="self h-[93%] w-full">
            <div className="flex h-full w-full">
              <Sidebar>
                <Tabs.List>
                  <Tabs.Tab
                    value="main-conversation"
                    leftSection={<IconMessageCircle />}
                    onClick={() => goToLink("/main-conversation")}
                  >
                    Main conversation
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="chat-history"
                    leftSection={<IconHistory />}
                    onClick={() => goToLink("/chat-history")}
                  >
                    Chat history
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="saved-answers"
                    leftSection={<IconBookmark />}
                    onClick={() => goToLink("/saved-answers")}
                  >
                    Saved answers
                  </Tabs.Tab>
                </Tabs.List>
              </Sidebar>
              <Layout>
                <main className="h-full w-full">
                  <Tabs.Panel
                    value={segment || "current"}
                    className="h-full w-full"
                  >
                    {children}
                  </Tabs.Panel>
                </main>
              </Layout>
            </div>
          </Tabs>
        </div>
      </MantineProvider>
    </>
  );
};

export default App;

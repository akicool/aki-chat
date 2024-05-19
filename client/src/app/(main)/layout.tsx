"use client";
import React, { ReactNode, useEffect } from "react";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useAtom } from "jotai";

import "@mantine/core/styles.css";
import "@mantine/spotlight/styles.css";
import { Center, SegmentedControl, Tabs } from "@mantine/core";

import {
  IconMessageCircle,
  IconHistory,
  IconBookmark,
} from "@tabler/icons-react";

import Layout from "@/components/layout";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { $user, $userLoader } from "@/store/user";

type Props = {
  children?: ReactNode;
};

const getUser = async () => {
  try {
    return axios
      .get("/api/getUser")
      .then((response) => {
        const [username, email] = [
          response?.data?.username,
          response?.data?.email,
        ];
        return { username, email };
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const App = ({ children }: Props) => {
  const session = useSession();
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const [user, setUser] = useAtom($user);
  const [_, setLoading] = useAtom($userLoader);

  useEffect(() => {
    (async () => {
      if (session?.status === "unauthenticated") {
        const userData = await getUser();
        if (!user) {
          setUser(userData!);
          setLoading(false);
        } else {
          setLoading(true);
        }
      }
    })();
  });

  const goToLink = (value: string) => {
    router.push(value);
  };

  return (
    <>
      <div className="h-screen w-full">
        <Header />
        <Tabs className="self h-[93%] w-full">
          <div className="flex h-full w-full">
            <Sidebar>
              <SegmentedControl
                className="self"
                radius={20}
                orientation="vertical"
                color="#067A6F"
                data={[
                  {
                    value: "main-conversation",
                    label: (
                      <Center onClick={() => goToLink("/main-conversation")}>
                        <IconMessageCircle />
                        <p>Main conversation</p>
                      </Center>
                    ),
                  },
                  {
                    value: "chat-history",
                    label: (
                      <Center onClick={() => goToLink("/chat-history")}>
                        <IconHistory />
                        <p>Chat history</p>
                      </Center>
                    ),
                  },
                  {
                    value: "saved-answers",
                    label: (
                      <Center onClick={() => goToLink("/saved-answers")}>
                        <IconBookmark />
                        <p>Saved answers</p>
                      </Center>
                    ),
                  },
                ]}
              />
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
    </>
  );
};

export default App;

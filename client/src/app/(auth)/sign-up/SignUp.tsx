"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import NextLink from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

import axios from "axios";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { notifications } from "@mantine/notifications";
import { IconBrandGoogle, IconLogout2 } from "@tabler/icons-react";

import headerLogo from "../../../../public/logo.svg";

type Props = {};

const localID = atomWithStorage("id", "");

export const SignUp = (props: Props) => {
  const session = useSession();
  const router = useRouter();

  const [_, setIdUser] = useAtom(localID);

  const formRef = useRef<HTMLFormElement>(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("/api/sign-up", {
        username,
        email,
        password,
      })
      .then((response) => {
        formRef?.current?.reset();
        setIdUser(response?.data?.user?._id);
        console.log(response?.data?.user?._id);

        if (response?.data?.user?._id) {
          notifications.show({
            title: "Default notification",
            message: "The user has been created! ✅",
          });
          router.push("/");
        }
      })
      .catch((error) => {
        const status = error?.response?.status;
        console.log(status);
        status == 409
          ? notifications.show({
              title: "Default notification",
              message: "The user already exists 🤥",
            })
          : notifications.show({
              title: "Default notification",
              message: "Invalid data ❌",
            });
      });
  };

  return (
    <div className="grid h-screen w-full place-items-center">
      <form
        className="flex w-full max-w-3xl flex-col justify-center space-y-4 px-5"
        onSubmit={onSubmit}
        ref={formRef}
      >
        <div className="flex w-full items-center justify-center gap-2">
          <NextImage
            src={headerLogo}
            alt="headerLogo"
            quality={100}
            sizes="100vw"
          />
          <h3 className="text-2xl">Akihiro chat</h3>
        </div>
        <label className="input input-bordered flex items-center gap-2 bg-transparent">
          <input
            type="text"
            className="grow"
            placeholder="Username"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value.trim())
            }
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 bg-transparent">
          <input
            type="text"
            className="grow"
            placeholder="Email"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value.trim())
            }
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 bg-transparent">
          <input
            type="password"
            className="grow"
            placeholder="Password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value.trim())
            }
          />
        </label>
        <button className="btn btn-outline btn-accent">Sign Up</button>
        <div className="flex w-full justify-center">or</div>
        <div className="">
          {session.data ? (
            <NextLink
              href={"/"}
              className="btn btn-outline btn-error flex items-center gap-2"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out <IconLogout2 />
            </NextLink>
          ) : (
            <div className="flex w-full justify-between gap-3">
              <NextLink
                href={"/login"}
                className="btn btn-outline btn-accent w-1/2"
              >
                Login
              </NextLink>
              <NextLink
                href={"/"}
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="btn btn-outline btn-accent flex w-1/2"
              >
                Google
                <IconBrandGoogle />
              </NextLink>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

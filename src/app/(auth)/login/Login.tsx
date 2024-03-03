"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import NextLink from "next/link";
import NextImage from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { IconBrandGoogle, IconLogout2, IconX } from "@tabler/icons-react";

import { $user } from "@/store/user/store";
import headerLogo from "../../../../public/logo.svg";

type Props = {};

export const Login = (props: Props) => {
  const session = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log(res);
      if (res?.ok) {
        notifications.show({
          title: "Default notification",
          message: "You have successfully logged in ✅",
        });
        router.push("/");
      } else {
        notifications.show({
          title: "Default notification",
          message: "User does not exist ❌",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="grid h-screen w-full place-items-center">
      <form
        className="flex w-full max-w-3xl flex-col justify-center space-y-4 px-5"
        onSubmit={onSubmit}
        // ref={formRef}
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
            placeholder="Email"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 bg-transparent">
          <input
            type="password"
            className="grow"
            placeholder="Password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </label>
        <button className="btn btn-outline btn-accent">Login</button>
        <div className="flex w-full justify-center">or</div>

        <div className="flex w-full justify-between gap-3">
          <NextLink
            href={"/sign-up"}
            className="btn btn-outline btn-accent w-1/2"
          >
            Sign Up
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
      </form>
    </div>
  );
};

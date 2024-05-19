"use client";

import { ChangeEvent } from "react";
import clsx from "clsx";
import { IconSend } from "@tabler/icons-react";

type InputType = {
  messageField?: string | undefined;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  onClick?: () => void;
  inModal?: Boolean;
};

export const Input = ({
  messageField,
  onChange,
  onClick,
  inModal,
}: InputType) => {
  return (
    <>
      <div className="flex w-full items-center justify-center gap-3 px-3 py-8">
        <input
          type="text"
          placeholder="Type here"
          className={clsx(
            "input input-bordered bg-transparent",
            inModal ? "w-full" : "w-4/5",
          )}
          onChange={onChange}
          value={messageField}
        />

        {!inModal && (
          <button
            className={clsx(
              "btn btn-accent btn-active h-14 w-14 rounded-full opacity-0 transition duration-300",
              messageField?.trim() != "" && "opacity-100",
            )}
            onClick={onClick}
          >
            <IconSend />
          </button>
        )}
      </div>
    </>
  );
};

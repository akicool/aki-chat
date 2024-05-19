import { Button as ButtonMantine } from "@mantine/core";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Button = ({ children, className, onClick }: Props) => {
  return (
    <ButtonMantine
      variant="filled"
      color="#067A6F"
      size="lg"
      radius="xl"
      className={className}
      w="100%"
      onClick={onClick}
    >
      {children}
    </ButtonMantine>
  );
};

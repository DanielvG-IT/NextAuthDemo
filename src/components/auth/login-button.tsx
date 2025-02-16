"use client";

interface LoginButtonProps {
  children: React.ReactNode;
  mode: "modal" | "redirect";
  asChild: boolean;
}

import React from "react";
import { useRouter } from "next/navigation";

const LoginButton = ({
  children,
  mode = "redirect",
  asChild = false,
}: LoginButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  };

  // TODO Implement login modal!
  if (mode === "modal") {
    return <span>TODO Implement modal!</span>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton;

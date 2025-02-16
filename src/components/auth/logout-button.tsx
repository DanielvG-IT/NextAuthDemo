"use client";

interface LogoutButtonProps {
  children: React.ReactNode;
}

import { logout } from "@/actions/logout";

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logout();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LogoutButton;

"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const user = useCurrentUser();
  const onClick = () => {
    logout();
  };

  // TODO First second after login user is null
  return (
    <div className="bg-white p-10 rounded-xl">
      <button onClick={onClick}>Sign Out</button>
    </div>
  );
};

export default SettingsPage;

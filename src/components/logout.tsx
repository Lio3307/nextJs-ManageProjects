"use client";

import { authClient } from "@/lib/auth-client";

export default function LogedOut() {
  const handleLogOut = async () => {
    await authClient.signOut();
  };
  return <button onClick={handleLogOut}>Log out</button>;
}

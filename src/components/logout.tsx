"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

export default function LogedOut() {
  const handleLogOut = async () => {
    await authClient.signOut();
  };
  return (
    <Button variant="outline" onClick={handleLogOut}>
      Log out <LogOutIcon className="size-4" />{" "}
    </Button>
  );
}

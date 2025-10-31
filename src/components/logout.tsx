"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function LogedOut({ children }: { children: ReactNode }) {
  const router = useRouter();
  const handleLogOut = async () => {
    const session = await authClient.getSession();
    const token = session.data?.session.token;
    if (token) {
      await authClient.revokeSession({ token });
    }
    await authClient.signOut();

    router.push("/login");
    router.refresh();
  };
  return (
    <div 
      onClick={handleLogOut} 
      className="w-full"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleLogOut();
        }
      }}
      aria-label="Log out of your account"
    >
      {children}
    </div>
  );
}

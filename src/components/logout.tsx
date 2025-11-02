"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useLoading } from "@/components/loading-context";

export default function LogedOut({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();

  const handleLogOut = async () => {
    showLoading("Signing out...");
    try {
      const session = await authClient.getSession();
      const token = session.data?.session.token;
      if (token) {
        await authClient.revokeSession({ token });
      }
      await authClient.signOut();
      
      router.push("/login");
      router.refresh();
      hideLoading();
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
      router.refresh();
    } 
  };

  return (
    <div>
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
    </div>
  );
}

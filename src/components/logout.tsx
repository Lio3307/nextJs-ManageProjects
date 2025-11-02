"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

export default function LogedOut({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      const session = await authClient.getSession();
      const token = session.data?.session.token;
      if (token) {
        await authClient.revokeSession({ token });
      }
      await authClient.signOut();
      
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      // Still redirect to login even if there's an error
      router.push("/login");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay 
        message="Signing out..." 
        isVisible={isLoading} 
      />
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
    </>
  );
}

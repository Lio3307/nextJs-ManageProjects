"use client";

import { Loader2 } from "lucide-react";
import { createPortal, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export default function SubmitForm({ buttonName }: { buttonName: ReactNode }) {
  const { pending } = useFormStatus();
  const loadingPortal = document.querySelector("#loading-submit");
  if (!loadingPortal) return;

  return (
    <>
      <Button type="submit" disabled={pending}>
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : buttonName}
      </Button>
      {pending &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 animate-spin text-white" />
              <p className="text-white text-sm">Processing...</p>
            </div>
          </div>,
          loadingPortal
        )}
    </>
  );
}

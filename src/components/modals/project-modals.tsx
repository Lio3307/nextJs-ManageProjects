"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { handleAddProjects } from "@/app/actions";
import SubmitForm from "../submit-form";
import { X } from "lucide-react";

export default function ProjectModal({ onClose }: { onClose?: () => void }) {
  const [portalEl, setPortalEl] = useState<Element | null>(null);

  useEffect(() => {
    setPortalEl(document.querySelector("#portals"));
  }, []);

  if (!portalEl) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <Card className="relative z-10 w-full max-w-md rounded-2xl shadow-xl border bg-white">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
        >
          <X className="cursor-pointer" size={20} />
        </button>

        <CardHeader className="text-lg font-semibold">Create Project</CardHeader>

        <CardContent>
          <form action={handleAddProjects} className=" space-y-4">
            <div>
              <Label className="my-2 text-gray-600" htmlFor="title">Project Name</Label>
              <Input type="text" id="title" name="title" required />
            </div>
            <SubmitForm buttonName="Create Project" />
          </form>
        </CardContent>
      </Card>
    </div>,
    portalEl
  );
}

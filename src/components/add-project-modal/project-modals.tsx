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
  const [portal, setPortal] = useState<Element | null>(null);
  const [selectedVisibility, setSelectedVisibility] = useState<string>("");

  useEffect(() => {
    setPortal(document.querySelector("#portals"));
  }, []);

  if (!portal) return null;

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

        <CardHeader className="text-lg font-semibold">
          Create Project
        </CardHeader>

        <CardContent>
          <form action={handleAddProjects} className=" space-y-4">
            <div>
              <Label className="my-2 text-gray-600" htmlFor="title">
                Project Name
              </Label>
              <Input type="text" id="title" name="title" required />
            </div>
            <div className="flex justify-between gap-2">
              <p>Select visibility : </p>
              <select
                name="visibility"
                onChange={(e) => setSelectedVisibility(e.target.value)}
                value={selectedVisibility}
                className="py-1 px-4"
                required
              >
                Visibility
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
            <div>
              <Label className="my-2 text-gray-600" htmlFor="title">
                Project Description
              </Label>
              <textarea
                id="description"
                name="description"
                required
                className="w-full min-h-[100px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Write a short description..."
              />{" "}
            </div>
            <SubmitForm buttonName="Create Project" />
          </form>
        </CardContent>
      </Card>
    </div>,
    portal
  );
}

"use client";

import { Project } from "@prisma/client";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import SubmitForm from "../submit-form";
import { buttonVariants } from "../ui/button";
import { ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";
import { handleUpdateProject } from "@/app/actions";

export default function EditFormProject({
  selectedData,
}: {
  selectedData: Project;
}) {
  const [newTitle, setNewTitle] = useState<string>(selectedData.title);
  const [newDesc, setNewDesc] = useState<string>(selectedData.description);
  const [newVisibilityType, setNewVisibilityType] = useState<string>(
    selectedData.visibility
  );

  const handleSubmit = async () => {
    try {
      await handleUpdateProject(newTitle, newDesc, selectedData.id, newVisibilityType);
    } catch (error) {
      throw new Error(`Something error ${error}`);
    } finally {
      alert("Successfully updated the project");
    }
  };

  return (
    <div className="p-6 w-full">
      <form action={handleSubmit} className="space-y-6">
        <div className="flex justify-end gap-3">
          <Link
            href={`/project/${selectedData.id}`}
            className={buttonVariants({ variant: "secondary" })}
          >
            <ArrowLeftFromLine className="mr-2 h-4 w-4" />
            Back
          </Link>
          <SubmitForm buttonName="Update" />
        </div>

        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            name="newTitle"
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Visibility</Label>
          <select
            name="newVisibility"
            onChange={(e) => setNewVisibilityType(e.target.value)}
            value={newVisibilityType}
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <textarea
            name="newDesc"
            onChange={(e) => setNewDesc(e.target.value)}
            value={newDesc}
            className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y"
          />
        </div>
      </form>
    </div>
  );
}

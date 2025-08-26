"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { handleAddProjects } from "@/app/actions";

export default function ProjectModal() {
  const [portalEl, setPortalEl] = useState<Element | null>(null);
  const { idProject } = useParams<{ idProject: string }>();

  useEffect(() => {
    setPortalEl(document.querySelector("#portals"));
  }, []);

  if (!idProject) {
    return <p className="text-red-500">Unknown project</p>;
  }

  if (!portalEl) return null;

  return createPortal(
    <Card className="p-4 shadow-lg">
      <CardHeader>Create task</CardHeader>
      <CardContent>
        <form action={handleAddProjects} className="space-y-2">
          <input type="hidden" name="projectId" value={idProject} />
          <div>
            <Label htmlFor="title">Project Name</Label>
            <Input id="title" type="text" name="title" required />
          </div>
          <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
            Save
          </button>
        </form>
      </CardContent>
    </Card>,
    portalEl
  );
}

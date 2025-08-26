"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import { createPortal } from "react-dom";
import { useParams } from "next/navigation";
import { handleAddProjects } from "@/app/actions";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function ProjectModal() {
  const portals = document.querySelector("#portals");
  const { idProject } = useParams();
  if (!idProject) {
    return alert("Unknown project");
  }
  if (!portals) return null;

  return createPortal(
    <Card>
      <CardHeader>Create task</CardHeader>
      <CardContent>
        <form action={handleAddProjects}>
            <Label>Project Name</Label>
            <Input type="text" name="title"/>
        </form>
      </CardContent>
    </Card>,
    portals
  );
}

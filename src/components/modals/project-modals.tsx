"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import { createPortal } from "react-dom";
import { useParams } from "next/navigation";
import Tiptap from "../tiptap-editor";

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
        <Tiptap idProject={idProject} />
      </CardContent>
    </Card>,
    portals
  );
}

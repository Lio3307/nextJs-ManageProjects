import EditFormProject from "@/components/edit-form/edit-project-form";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

export default async function UpdateProject({
  params,
}: {
  params: Promise<{ idProject: string }>;
}) {
  const { idProject } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/");

  const selectedProject = await prisma.project.findUnique({
    where: {
      id: idProject,
    },
  });

  if (session.user.id !== selectedProject?.userId) return notFound();

  return (
    <EditFormProject selectedData={selectedProject}/>
  )
}

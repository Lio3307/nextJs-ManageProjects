import Tiptap from "@/components/tiptap-editor";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

export default async function AddTask({
  params,
}: {
  params: Promise<{ idProject: string }>;
}) {
  const { idProject } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/login");

  const project = await prisma.project.findUnique({
    where: {
      id: idProject,
    },
  });

  if (session.user.id !== project?.userId) return notFound();

  return (
    <>
      <div className="p-6">
        <Tiptap idProject={idProject} />
      </div>
    </>
  );
}

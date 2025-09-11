import { Input } from "@/components/ui/input";
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
    <>
    
    <div className="p-4"> 
        <form action="">
            <div className="flex flex-col gap-3">
            <div>
                <Label>Title</Label>
                <Input value={selectedProject.title}/>
            </div>
            <div>
                <Label>Description</Label>
                <textarea value={selectedProject.description}/>
            </div>
            </div>
        </form>
    </div>

    </>
  )
}

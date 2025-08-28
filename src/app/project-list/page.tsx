import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProjectCard from "@/components/project-card";
import ModalTrigger from "@/components/modals/modal-trigger";
import ProjectModal from "@/components/modals/project-modals";

export default async function ProjectList() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  const data = await prisma.project.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="px-4 py-6">
      {data.length === 0 ? (
        <p className="text-center text-muted-foreground text-sm">
          You don&apos;t have any tasks yet.
        </p>
      ) : (
        <div className="p-2">
          <div className="flex justify-between my-4">
            <p className="text-2xl font-bold">Your Project List</p>

            <ModalTrigger
              compo={<ProjectModal />}
              buttonName="Create Project"
            />
          </div>
          <p className="my-2 text-xs text-gray-600">
            You have {data.length} project
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            {data.map((item) => (
              <ProjectCard key={item.id} data={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

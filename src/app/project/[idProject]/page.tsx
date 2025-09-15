import TaskCard from "@/components/task-card";
import { buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DeleteProject from "@/components/delete-button/delete-project";

export default async function DetailProject({
  params,
}: {
  params: Promise<{ idProject: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  const { idProject } = await params;

  const dataProject = await prisma.project.findUnique({
    where: {
      id: idProject,
    },
  });

  const dataTask = await prisma.task.findMany({
    where: {
      projectId: idProject,
    },
  });

  if (!dataProject) {
    return notFound();
  }

  return (
    <div className="p-4">
      <div className="flex flex-col p-4 shadow-md rounded-lg bg-background">
        <div className="flex justify-between items-start">
          <p className="text-xs text-gray-600">
            By: <span className="font-bold">{dataProject.createdBy}</span>
          </p>
          <div className="flex items-center gap-2">
            <p className="text-xs text-gray-600">
              Created at:{" "}
              <span className="font-bold">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(dataProject.createdAt)}
              </span>
            </p>
            {session.user.id === dataProject.userId && (
              <DeleteProject idProject={dataProject.id} />
            )}
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-600">
            <span className="font-bold">
              {dataProject.visibility === "Public"
                ? "Public Project"
                : "Private Project"}
            </span>
          </p>
        </div>

        <div className="mt-4">
          <p className="text-xs text-gray-600">Project:</p>
          <h2 className="mt-2 text-2xl font-bold">{dataProject.title}</h2>
          <p className="mt-2 mb-3 text-xs text-gray-600">
            {dataProject.description}
          </p>
        </div>

        <div className="flex justify-end">
          <Link
            href={`/project/${idProject}/add-task`}
            className={buttonVariants()}
          >
            Add Task
          </Link>
        </div>
      </div>

      {!dataTask || dataTask.length === 0 ? (
        <div className="flex justify-center items-center mt-8">
          <p className="text-xs text-gray-600 text-center">
            You don’t have any tasks yet
          </p>
        </div>
      ) : (
        <div className="flex flex-col mt-6">
          <p className="mb-3 text-xs text-gray-600">
            {dataTask.length} Task{dataTask.length > 1 ? "s" : ""}:
          </p>
          <div className="flex flex-wrap gap-4">
            {dataTask.map((item) => (
              <TaskCard key={item.id} data={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

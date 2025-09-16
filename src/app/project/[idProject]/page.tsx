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
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex flex-col p-4 lg:p-6 shadow-lg rounded-xl bg-background border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
          <div className="flex flex-col space-y-2">
            <p className="text-xs sm:text-sm text-gray-600">
              By:{" "}
              <span className="font-semibold text-gray-800">
                {dataProject.createdBy}
              </span>
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              Created:{" "}
              <span className="font-semibold text-gray-800">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(dataProject.createdAt)}
              </span>
            </p>
          </div>

          {session.user.id === dataProject.userId && (
            <div className="flex justify-end sm:justify-start">
              <DeleteProject idProject={dataProject.id} />
            </div>
          )}
        </div>

        <div className="my-3">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              dataProject.visibility === "Public"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {dataProject.visibility === "Public"
              ? "🌐 Public Project"
              : "🔒 Private Project"}
          </span>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2">
              Project
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              {dataProject.title}
            </h2>
          </div>

          <div>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {dataProject.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 pt-4 border-t border-gray-100">
          <Link
            href={`/project/${idProject}/member`}
            className="inline-flex items-center justify-center sm:justify-start text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors duration-200 group"
          >
            <span>Check Member List</span>
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </Link>

          <div className="flex justify-end">
            <Link
              href={`/project/${idProject}/add-task`}
              className={buttonVariants()}
            >
              Add Task
            </Link>
          </div>
        </div>
      </div>

      {!dataTask || dataTask.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-8 p-8 bg-gray-50 rounded-xl border border-gray-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-600 font-medium">No tasks yet</p>
            <p className="text-xs text-gray-500 mt-1">
              Create your first task to get started
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Tasks ({dataTask.length})
            </h3>
            <div className="text-sm text-gray-500">
              {dataTask.length} task{dataTask.length > 1 ? "s" : ""} total
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {dataTask.map((item) => (
              <div key={item.id} className="w-full">
                <TaskCard data={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

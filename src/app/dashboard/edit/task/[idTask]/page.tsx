import EditTaskForm from "@/components/dashboard-components/edit-form/edit-task-form";
import EditTaskSkeleton from "@/components/dashboard-components/loading-skeleton/edit-task-skeleton";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

export default async function EditTask({
  params,
}: {
  params: Promise<{ idTask: string }>;
}) {
  const { idTask } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return redirect("/login");

  const selectedTask = await prisma.task.findUnique({
    where: {
      id: idTask,
    },
  });

  if (!selectedTask) throw new Error("Unknown task");

  if (session.user.id !== selectedTask.userId) return notFound();

  return (
    <div className="p-4">
      <Suspense fallback={<EditTaskSkeleton />}>
        <EditTaskForm
          contentTask={selectedTask.content}
          titleTask={selectedTask.title}
          taskId={selectedTask.id}
        />
      </Suspense>
    </div>
  );
}

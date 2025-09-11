import EditTaskForm from "@/components/edit-form/edit-task-form";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

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
    <>
      <EditTaskForm
        contentTask={selectedTask.content}
        titleTask={selectedTask.title}
        taskId={selectedTask.id}
      />
    </>
  );
}

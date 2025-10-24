"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function handleDeleteTask(idTask: string) {
  const getProjectId = await prisma.task.findUnique({
    where: {
      id: idTask,
    },
  });

  await prisma.task.delete({
    where: {
      id: idTask,
    },
  });

  revalidatePath(`/project/${getProjectId?.projectId}`);
  return redirect(`/project/${getProjectId?.projectId}`);
}
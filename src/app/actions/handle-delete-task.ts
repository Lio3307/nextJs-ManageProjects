"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function handleDeleteTask(idTask: string) {
  try {
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

    try {
      revalidatePath(`/project/${getProjectId?.projectId}`);
      return redirect(`/project/${getProjectId?.projectId}`);
    } finally {
      return { success: true, massage: "Successfully delete task" };
    }
  } catch (error) {
    console.error(`Cannot delete task : ${error}`);
    return { success: false, massage: "Something wrong, please try again" };
  }
}

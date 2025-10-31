"use server";

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

    revalidatePath(`/dashboard/project/${getProjectId?.projectId}`);
    return { suxccess: true, message: "Successfully delete task" };
  } catch (error) {
    console.error(`Cannot delete task : ${error}`);
    return { success: false, message: "Something wrong, please try again" };
  }
}

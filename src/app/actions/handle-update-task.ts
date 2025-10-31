"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function handleUpdateTask(
  newTitle: string,
  newContent: string,
  idTask: string
) {
  try {
    await prisma.task.update({
      where: {
        id: idTask,
      },
      data: {
        title: newTitle,
        content: newContent,
      },
    });

    revalidatePath(`/dashboard/task/${idTask}`);
    return { success: true, message: "Task Updated!" };
  } catch (error) {
    console.error(`Cannot update task : ${error}`);
    return { success: false, message: "Something wrong, please try again" };
  }
}

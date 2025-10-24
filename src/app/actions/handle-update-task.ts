"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function handleUpdateTask(
  newTitle: string,
  newContent: string,
  idTask: string
) {
  await prisma.task.update({
    where: {
      id: idTask,
    },
    data: {
      title: newTitle,
      content: newContent,
    },
  });

  revalidatePath(`/task/${idTask}`);
  return redirect(`/task/${idTask}`);
}
"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function handleAddTask(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const projectId = formData.get("projectId") as string;

    if (!title.trim() || !content.trim()) {
      return { success: false, message: "Title and content are required" };
    }

    await prisma.task.create({
      data: {
        title: title,
        content: content,
        createdBy: session.user.name,
        userId: session.user.id,
        projectId: projectId,
      },
    });

    revalidatePath(`/project/${projectId}`);

    return { success: true, message: "Successfully create task" };
  } catch (error) {
    console.error(`Cannot create task : ${error}`);
    return { success: false, message: "Something wrong, please try again" };
  }
}

"use server"

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

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const projectId = formData.get("projectId") as string;

  if (!title.trim() || !content.trim()) {
    throw new Error("Title and content are required");
  }

  await prisma.task.create({
    data: {
      title: title,
      content: content,
      createdBy: session.user.name,
      userId: session.user.id,
      projectId: projectId,
    } 
  });
  revalidatePath(`/project/${projectId}`);
  return redirect(`/project/${projectId}`);
}
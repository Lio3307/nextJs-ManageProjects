"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

type ProjectData = {
  title: string;
  userId: string;
  createdBy: string;
};

type TaskTypes = {
  title: string
  content: string
  createdBy: string
  userId: string
  projectId: string
}

export async function handleAddProjects(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }
  const title = formData.get("title");

  if (!title) {
    throw new Error("Title are required");
     }

  await prisma.project.create({
    data: {
      title: title,
      userId: session.user.id,
      createdBy: session.user.name,
    } as ProjectData,
  });
  revalidatePath("/project-list");
  return redirect("/project-list");
}


export async function handleAddTask(formData: FormData){
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session){
    return redirect("/login")
  }

  const title = formData.get("title")
  const content = formData.get("content")
  const projectId = formData.get("projectId")

  if(!title || !content){
    throw new Error("Title and content are required");
    
  }

  await prisma.task.create({
    data: {
      title: title,
      content: content,
      createdBy: session.user.name,
      userId: session.user.id,
      projectId: projectId
    } as TaskTypes
  })
}
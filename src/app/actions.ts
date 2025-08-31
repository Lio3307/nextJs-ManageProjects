"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

type ProjectData = {
  title: string;
  description: string
  userId: string;
  createdBy: string;
};

type TaskTypes = {
  title: string;
  content: string;
  createdBy: string;
  userId: string;
  projectId: string;
};

type ReportType = {
        title: string
      description: string
      createdBy: string
      userId: string
      taskId: string
}

export async function handleAddProjects(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }
  const title = formData.get("title");
  const description = formData.get("description")

  if (!title || !description) {
    throw new Error("Title and description are required");
  }

  await prisma.project.create({
    data: {
      title: title,
      description: description,
      userId: session.user.id,
      createdBy: session.user.name,
    } as ProjectData,
  });
  revalidatePath("/project-list");
  revalidatePath("/");
  return redirect("/");
}

export async function handleAddTask(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  const title = formData.get("title");
  const content = formData.get("content");
  const projectId = formData.get("projectId");

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  await prisma.task.create({
    data: {
      title: title,
      content: content,
      createdBy: session.user.name,
      userId: session.user.id,
      projectId: projectId,
    } as TaskTypes,
  });
  revalidatePath(`/project/${projectId}`)
  return redirect(`/project/${projectId}`)
}


export async function handleReport(formData: FormData){
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session){
    return redirect("/login")
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const idTask = formData.get("idTask")

  if(!title.trim() || !description.trim()){
    throw new Error("Title and description cannot empty");
    
  }

  await prisma.report.create({
    data: {
      title: title,
      description: description,
      createdBy: session.user.name,
      userId: session.user.id,
      taskId: idTask,
    } as ReportType
  })
}
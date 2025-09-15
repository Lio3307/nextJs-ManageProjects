"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

type ProjectData = {
  title: string;
  description: string;
  userId: string;
  createdBy: string;
  visibility: string;
};

type TaskTypes = {
  title: string;
  content: string;
  createdBy: string;
  userId: string;
  projectId: string;
};

type ReportType = {
  title: string;
  description: string;
  createdBy: string;
  userId: string;
  taskId: string;
};

type CommentType = {
  comment: string;
  commentBy: string;
  userId: string;
  reportId: string;
};

export async function handleAddProjects(title: string, description: string, visibility: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }


  const latestProject = await prisma.project.create({
    data: {
      title: title,
      description: description,
      userId: session.user.id,
      createdBy: session.user.name,
      visibility,
    } as ProjectData,
  });

  const getMemberName = await prisma.user.findUnique({
    where: {
      id: latestProject.userId
    } as User
  })

  if(!getMemberName){
    throw new Error("Invalid member name");
    
  }

  await prisma.memberList.create({
    data: {
      memberList: getMemberName?.name,
      projectId: latestProject.id,
    },
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
    } as TaskTypes,
  });
  revalidatePath(`/project/${projectId}`);
  return redirect(`/project/${projectId}`);
}

export async function handleReport(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const referer = (await headers()).get("referer");

  if (!session) {
    return redirect("/login");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const idTask = formData.get("idTask") as string;

  if (!title.trim() || !description.trim()) {
    throw new Error("Title and description cannot empty");
  }

  await prisma.report.create({
    data: {
      title: title,
      description: description,
      createdBy: session.user.name,
      userId: session.user.id,
      taskId: idTask,
    } as ReportType,
  });

  if (referer) {
    const url = new URL(referer);
    revalidatePath(url.pathname);
    return redirect(url.pathname);
  }

  revalidatePath("/");
  return redirect("/");
}

export async function handleComment(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/login");

  const comment = formData.get("comment") as string;
  const idReport = formData.get("reportId") as string;

  if (!comment.trim()) throw new Error("Comment cannot empty");
  if (!idReport) throw new Error("Unknown report");

  await prisma.comment.create({
    data: {
      comment,
      commentBy: session.user.name,
      userId: session.user.id,
      reportId: idReport,
    } as CommentType,
  });
  revalidatePath(`/report/${idReport}`);
}

export async function handleDeleteProject(idProject: string) {
  await prisma.project.delete({
    where: {
      id: idProject,
    },
  });

  revalidatePath("/");
  return redirect("/");
}

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

export async function handleDeleteReport(idReport: string) {
  const currentReport = await prisma.report.findUnique({
    where: {
      id: idReport,
    },
  });

  await prisma.report.delete({
    where: {
      id: idReport,
    },
  });

  revalidatePath(`/task/${currentReport?.taskId}`);
  return redirect(`/task/${currentReport?.taskId}`);
}

export async function handleUpdateProject(
  newTitle: string,
  newDesc: string,
  idProject: string,
  newVisibility: string
) {
  await prisma.project.update({
    where: {
      id: idProject,
    },
    data: {
      title: newTitle,
      description: newDesc,
      visibility: newVisibility
    },
  });

  revalidatePath(`/project/${idProject}`);
  return redirect(`/project/${idProject}`);
}

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

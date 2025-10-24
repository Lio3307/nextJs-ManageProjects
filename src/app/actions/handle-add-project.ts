"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";


export async function handleAddProject(
  title: string,
  description: string,
  visibility: string
) {
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
    },
  });

  const getMemberName = await prisma.user.findUnique({
    where: {
      id: latestProject.userId,
    } as User,
  });

  if (!getMemberName) {
    throw new Error("Invalid member name");
  }

  await prisma.memberList.create({
    data: {
      memberList: getMemberName?.name,
      memberIdList: getMemberName?.id,
      projectId: latestProject.id,
    },
  });

  revalidatePath("/project-list");
  revalidatePath("/");
  return redirect(`/project/${latestProject.id}`);
}
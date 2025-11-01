"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

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

  try {
    const latestProject = await prisma.project.create({
      data: {
        title: title,
        description: description,
        userId: session.user.id,
        createdBy: session.user.name,
        visibility,
      },
    });

    await prisma.memberList.create({
      data: {
        memberList: session.user.name,
        memberIdList: session.user.id,
        projectId: latestProject.id,
      },
    });

    revalidatePath("/dashboard/project-list");
    revalidatePath("/dashboard");
    return { success: true, message: "Successfully create project" };
  } catch (error) {
    console.error(`Cannot add project : ${error}`);
    return { success: false, message: "Something wrong, please try again" };
  }
}

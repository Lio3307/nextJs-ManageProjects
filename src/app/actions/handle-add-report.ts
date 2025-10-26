"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function handleAddReport(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const referer = (await headers()).get("referer");

  if (!session) {
    return redirect("/login");
  }

  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const idTask = formData.get("idTask") as string;

    if (!title.trim() || !description.trim()) {
      return { success: false, massage: "Title and description cannot empty" };
    }

    await prisma.report.create({
      data: {
        title: title,
        description: description,
        createdBy: session.user.name,
        userId: session.user.id,
        taskId: idTask,
      },
    });

    if (referer) {
      const url = new URL(referer);
      revalidatePath(url.pathname);
    }

    return { success: true, massage: "Successfully create report" };
  } catch (error) {
    console.error(`Cannot create new report : ${error}`);
    return { success: false, massage: "Something wrong, please try again" };
  }
}

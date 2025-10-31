"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function handleAddComment(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/login");

  try {
    const comment = formData.get("comment") as string;
    const idReport = formData.get("reportId") as string;

    if (!comment.trim())
      return { success: false, message: "Comment cannot empty!" };
    if (!idReport)
      return { success: false, message: "Something wrong, please try again" };

    await prisma.comment.create({
      data: {
        comment,
        commentBy: session.user.name,
        userId: session.user.id,
        reportId: idReport,
      },
    });

    revalidatePath(`/dashboard/report/${idReport}`);
    return { success: true, message: "Successfully create comment" };
  } catch (error) {
    console.error(`Cannot create comment : ${error}`);
    return { success: false, message: "Cannot create comment, try again" };
  }
}

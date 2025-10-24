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
    }
  });
  revalidatePath(`/report/${idReport}`);
}
"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

type ProjectData = {
  title: string;
  content: string;
  userId: string;
  createdBy: string;
};

export default async function handleAddProjects(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }
  const title = formData.get("title");
  const content = formData.get("content");

  if (!title || !content) {
    throw new Error("Title and content are required.");
  }

  await prisma.project.create({
    data: {
      title: title,
      content: content,
      userId: session.user.id,
      createdBy: session.user.name,
    } as ProjectData,
  });
  revalidatePath("/");
  return redirect("/");
}

"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function handleDeleteProject(idProject: string) {
  await prisma.project.delete({
    where: {
      id: idProject,
    },
  });

  revalidatePath("/");
  return redirect("/");
}
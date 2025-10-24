"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

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
      visibility: newVisibility,
    },
  });

  revalidatePath(`/project/${idProject}`);
  return redirect(`/project/${idProject}`);
}
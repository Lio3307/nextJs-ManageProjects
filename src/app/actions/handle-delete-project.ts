"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function handleDeleteProject(idProject: string) {
  try {
    await prisma.project.delete({
      where: {
        id: idProject,
      },
    });

    try {
      revalidatePath("/");
      return redirect("/");
    } finally {
      return { success: true, massage: "Successfully delete project" };
    }
  } catch (error) {
    console.error(`Cannot delete project : ${error}`);
    return { success: false, massage: "Something wrong, please try again" };
  }
}

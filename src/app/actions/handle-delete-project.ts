"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function handleDeleteProject(idProject: string) {
  try {
    await prisma.project.delete({
      where: {
        id: idProject,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, message: "Successfully delete project" };
  } catch (error) {
    console.error(`Cannot delete project : ${error}`);
    return { success: false, message: "Something wrong, please try again" };
  }
}

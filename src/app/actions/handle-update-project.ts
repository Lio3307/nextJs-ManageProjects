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
  try {
    
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
  
    try{
      revalidatePath(`/project/${idProject}`);
      return {success: true, message: "Project Updated!"}
    }finally{
      return redirect(`/project/${idProject}`);
    }
  } catch (error) {
    console.error(`Cannot update project : ${error}`)
    return {success: false, message: "Something wrong, please try again"}
  }
}
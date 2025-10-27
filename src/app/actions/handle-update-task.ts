"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function handleUpdateTask(
  newTitle: string,
  newContent: string,
  idTask: string
) {
  try {
    
    await prisma.task.update({
      where: {
        id: idTask,
      },
      data: {
        title: newTitle,
        content: newContent,
      },
    });
  
    try{
      revalidatePath(`/task/${idTask}`);
      return {success: true, message: "Task Updated!"}
    }finally{
      return redirect(`/task/${idTask}`);
    }
  } catch (error) { 
    console.error(`Cannot update task : ${error}`)
    return {success: false, message: "Something wrong, please try again"}
  }
}
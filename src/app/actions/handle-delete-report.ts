"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function handleDeleteReport(idReport: string) {
  try {
    const currentReport = await prisma.report.findUnique({
      where: {
        id: idReport,
      },
    });

    await prisma.report.delete({
      where: {
        id: idReport,
      },
    });
    
    try {
      revalidatePath(`/task/${currentReport?.taskId}`);
      return redirect(`/task/${currentReport?.taskId}`);
    } finally {
      return { success: true, massage: "Successfully delete report" };
    }
  } catch (error) {
    console.error(`Cannot delete report : ${error}`);
    return { success: false, massage: "Something wrong, please try again" };
  }
}

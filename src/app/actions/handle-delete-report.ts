"use server";

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

    revalidatePath(`/dashboard/task/${currentReport?.taskId}`);
    return { success: true, message: "Successfully delete report" };
  } catch (error) {
    console.error(`Cannot delete report : ${error}`);
    return { success: false, message: "Something wrong, please try again" };
  }
}

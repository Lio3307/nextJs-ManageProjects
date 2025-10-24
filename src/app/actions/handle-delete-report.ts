"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function handleDeleteReport(idReport: string) {
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

  revalidatePath(`/task/${currentReport?.taskId}`);
  return redirect(`/task/${currentReport?.taskId}`);
}
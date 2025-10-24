"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function joinPublicProject(formData: FormData) {
  const idProject = formData.get("id-project") as string;
  const userId = formData.get("user-id") as string;

  const getUserName = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  await prisma.memberList.create({
    data: {
      projectId: idProject,
      memberIdList: userId,
      memberList: getUserName!.name,
    },
  });
  revalidatePath(`/project/${idProject}`);
}
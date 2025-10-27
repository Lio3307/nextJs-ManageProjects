"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function actionRequest(formData: FormData) {
  const idRequest = formData.get("id-req") as string;
  const idProject = formData.get("id-project") as string;
  const userId = formData.get("user-id") as string;
  const joinStatusId = formData.get("join-status-id") as string;
  const action = formData.get("action");

  if (!idProject || !userId || !idRequest || !joinStatusId) return;

  if (action === "accept") {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    try {
      
      await prisma.memberList.create({
        data: {
          projectId: idProject,
          memberIdList: userId,
          memberList: user!.name,
        },
      });
  
      await prisma.joinStatus.update({
        where: {
          id: joinStatusId,
        },
        data: {
          status: "Accepted",
        },
      });
      
      await prisma.requestJoin.delete({
        where: {
          id: idRequest,
        },
      });
      revalidatePath(`/project/${idProject}/request`);
      revalidatePath("/join-status");
    } catch (error) {
      console.error(`Cannot adding user to project : ${error}`)
    }
  } else {
    try {
      await prisma.joinStatus.create({
        data: {
          idProject,
          userId,
          status: "Rejected",
        },
      });
  
      await prisma.requestJoin.delete({
        where: {
          id: idRequest,
        },
      });
      revalidatePath(`/project/${idProject}/request`);
      revalidatePath("/join-status");
    } catch (error) {
      console.error(`Cannot update status of join : ${error}`)
    }
  }

}
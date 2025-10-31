"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function joinProjectByCode(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/login");

  try {
    const joinIdProject = formData.get("join-id-project") as string;
    const projectInviteCode = formData.get("project-invite-code") as string;

    if (!joinIdProject || !projectInviteCode)
      throw new Error("Somethinng wrong when joinning");

    await prisma.requestJoin.create({
      data: {
        projectId: joinIdProject,
        projectCode: projectInviteCode,
        userId: session.user.id,
        userName: session.user.name,
      },
    });

    await prisma.joinStatus.create({
      data: {
        idProject: joinIdProject,
        userId: session.user.id,
        status: "Pending",
      },
    });

    revalidatePath(`/dashboard/project/${joinIdProject}/request`);
    return { success: true, message: "Successfuy join project" };
  } catch (error) {
    console.error(`Cannot join project : ${error}`);
    return { success: false, message: "Something wrong, please try again" };
  }
}

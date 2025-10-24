"use server";

import prisma from "@/lib/prisma";

export async function searchProject(idCode: string, userId: string) {
  const project = await prisma.project.findFirst({
    where: {
      inviteCode: {
        equals: idCode,
        mode: "insensitive",
      },
    },
  });

  const memberList = project
    ? await prisma.memberList.findFirst({
        where: { projectId: project.id },
      })
    : null;

  const requestJoin = project
    ? await prisma.requestJoin.findFirst({
        where: {
          projectId: project.id,
          userId: userId,
        },
      })
    : null;

  return { project, memberList, requestJoin };
}
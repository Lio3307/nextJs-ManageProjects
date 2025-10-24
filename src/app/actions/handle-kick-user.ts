"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function kickUser(
  idMember: string,
  idMemberList: string,
  idProject: string
) {
  await prisma.memberList.delete({
    where: {
      id: idMemberList,
      memberIdList: idMember,
    },
  });

  revalidatePath(`/project/${idProject}/member`);
}
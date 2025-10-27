"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function kickUser(
  idMember: string,
  idMemberList: string,
  idProject: string
) {
  try {
    await prisma.memberList.delete({
      where: {
        id: idMemberList,
        memberIdList: idMember,
      },
    });
  
    revalidatePath(`/project/${idProject}/member`);
    return {success: true, message: "Member kicked!"}
  } catch (error) {
    console.error(`Cannot kick user : ${error}`)
    return {success: false, message: "Something wrong, please try again"}
  }
}
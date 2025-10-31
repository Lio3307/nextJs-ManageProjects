"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function handleAddReplyComment(
  idComment: string,
  replyText: string
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/login");

  try {
    
    if (!idComment) return {success: false, message: "Something wrong, please try again"};
  
    await prisma.replyComment.create({
      data: {
        commentId: idComment,
        userId: session.user.id,
        replyText,
      }
    });
  
    const getComment = await prisma.comment.findUnique({
      where: {
        id: idComment,
      },
      include: {
        report: true,
      },
    });
  
    revalidatePath(`/dashboard/report/${getComment?.reportId}`);
    return {success: true, message: "Replyed comment!"}
  } catch (error) {
    console.error(`Cannot reply comment : ${error}`)
    return {success: false, message: "Something wrong, please try again"}
  }

}
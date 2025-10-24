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

  if (!replyText || !idComment) throw new Error("Cannot reply the comment");

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

  revalidatePath(`/report/${getComment?.reportId}`);
}
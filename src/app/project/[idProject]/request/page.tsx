import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

export default async function RequestJoinList({
  params,
}: {
  params: Promise<{ idProject: string }>;
}) {
  const { idProject } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/login");

  const projectOwner = await prisma.project.findUnique({
    where: {
      id: idProject,
    },
  });

  if (session.user.id !== projectOwner?.userId) return notFound();

  const requestList = await prisma.requestJoin.findMany({
    where: {
      projectId: idProject,
    },
  });

  return (
    <>
      {requestList.length === 0 ? (
        <p>No request</p>
      ) : (
        requestList.map((request) => (
          <div key={request.id}>
            <p>Request Join By : {request.userName} </p>
          </div>
        ))
      )}
    </>
  );
}

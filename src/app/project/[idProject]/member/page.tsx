import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function MemberList({
  params,
}: {
  params: Promise<{ idProject: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return redirect("/login");

  const { idProject } = await params;
  const projectOwner = await prisma.project.findUnique({
    where: {
      id: idProject,
    },
  });
  const memberListData = await prisma.memberList.findMany({
    where: {
      projectId: idProject,
    },
  });

  return (
    <div className="p-4">
      <h3 className="text-2xl">Member list</h3>
      <div className="flex flex-col gap-2">
        {memberListData.length === 0 || !memberListData ? (
          <div>
            <h2 className="text-2xl text font-bold text-gray-600">
              No member list showed
            </h2>
          </div>
        ) : (
          memberListData.map((list) => (
            <div key={list.id} className="my-2 bg-gray-50">
              <div className="flex justify-between">
                <p className="text-sm font-bold">
                  {list.memberList}{" "}
                  {session.user.id === projectOwner?.userId
                    ? "Owner"
                    : "Member"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

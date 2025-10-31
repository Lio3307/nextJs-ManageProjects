import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumb-custom";
import KickMember from "@/components/action-button/kick-user";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Crown, UserRound, Users } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import MemberListSkeleton from "@/components/loading-skeleton/member-list-skeleron";

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
  const project = await prisma.project.findUnique({
    where: {
      id: idProject,
    },
  });
  if (!project) throw new Error("Uknown project");

  const memberListData = await prisma.memberList.findMany({
    where: {
      projectId: idProject,
    },
  });

  return (
    <Suspense fallback={<MemberListSkeleton />}>
      <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
  <div className="mb-6">
    <BreadcrumbWithCustomSeparator
      link={`/dashboard/project/${idProject}`}
      name={project.title}
      currentPageName="Member List"
    />
  </div>

  <div className="mb-8 p-6 bg-white dark:bg-neutral-950 rounded-2xl border-2 border-gray-200 dark:border-neutral-800 shadow-lg transition-colors duration-300">
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-black/10 dark:bg-neutral-800 rounded-xl flex items-center justify-center shadow-md">
        <Users
          className="w-6 h-6 text-black dark:text-white"
          strokeWidth={2.5}
        />
      </div>
      <div>
        <h3 className="text-2xl font-extrabold text-black dark:text-white tracking-tight">
          Member List
        </h3>
        <div className="flex items-center space-x-2 mt-1">
          <div className="px-3 py-1 bg-gray-100 dark:bg-neutral-900 rounded-full border border-gray-200 dark:border-neutral-800">
            <p className="text-xs lg:text-sm font-semibold text-black dark:text-white">
              {memberListData?.length || 0} member
              {(memberListData?.length || 0) !== 1 ? "s" : ""}
            </p>
          </div>
          <span className="text-xs text-gray-600 dark:text-neutral-400">
            in this project
          </span>
        </div>
      </div>
    </div>
  </div>

  <div className="space-y-4">
    {memberListData?.length === 0 || !memberListData ? (
      <div className="relative flex flex-col items-center justify-center p-12 lg:p-16 border-2 border-dashed border-gray-300 dark:border-neutral-800 rounded-2xl bg-gray-50 dark:bg-neutral-950 shadow-sm">
        <div className="w-20 h-20 bg-gray-200 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mb-6 shadow-md">
          <Users className="w-10 h-10 text-gray-500 dark:text-neutral-400" />
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-black dark:text-white text-center mb-3">
          No members found
        </h2>
        <p className="text-sm lg:text-base text-gray-600 dark:text-neutral-400 text-center max-w-md">
          This project doesnt have any members yet
        </p>
      </div>
    ) : (
      <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-xl border-2 border-gray-200 dark:border-neutral-800 overflow-hidden transition-colors duration-300">
        <div className="divide-y-2 divide-gray-100 dark:divide-neutral-800">
          {memberListData.map((list) => (
            <div
              key={list.id}
              className="group p-5 lg:p-6 hover:bg-gray-50 dark:hover:bg-neutral-900 transition-all duration-200"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center shadow-md ring-2 ring-gray-100 dark:ring-neutral-800 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <span className="text-white dark:text-black font-bold text-base">
                      {list.memberList?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-base lg:text-lg font-bold text-black dark:text-white truncate">
                      {list.memberList}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-neutral-400 mt-0.5">
                      Project{" "}
                      {project.userId === list.memberIdList
                        ? "Owner"
                        : "Member"}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {project.userId === list.memberIdList ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white shadow font-bold text-sm">
                      <Crown className="w-4 h-4" strokeWidth={2.5} />
                      <span>Owner</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-neutral-900 text-black dark:text-white border-2 border-gray-200 dark:border-neutral-800 shadow font-bold text-sm">
                      <UserRound className="w-4 h-4" strokeWidth={2.5} />
                      <span>Member</span>
                      {session.user.id === project.userId && (
                        <div className="ml-1 pl-2 border-l-2 border-gray-300 dark:border-neutral-700">
                          <KickMember
                            idUser={list.memberIdList}
                            idMemberList={list.id}
                            idProject={project.id}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</div>

    </Suspense>
  );
}

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
      <div className="p-4 lg:p-6 max-w-4xl mx-auto">
        <BreadcrumbWithCustomSeparator
          link={`/project/${idProject}`}
          name={project.title}
          currentPageName="Member List"
        />
        <div className="my-6">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Member List
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {memberListData?.length || 0} member
            {(memberListData?.length || 0) !== 1 ? "s" : ""} in this project
          </p>
        </div>

        <div className="space-y-3">
          {memberListData?.length === 0 || !memberListData ? (
            <div className="flex flex-col items-center justify-center p-8 lg:p-12 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 text-center mb-2">
                No members found
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                This project doesnt have any members yet
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {memberListData.map((list) => (
                  <div
                    key={list.id}
                    className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm">
                            {list.memberList?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {list.memberList}
                          </p>
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            project.userId === list.memberIdList
                              ? "bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800"
                              : "bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
                          }`}
                        >
                          {project.userId === list.memberIdList ? (
                            <>
                              <Crown className="h-[0.84rem]" />
                              Owner
                            </>
                          ) : (
                            <>
                              <UserRound className="h-[0.84rem]" />
                              Member
                              {session.user.id === project.userId ? (
                                <>
                                  <KickMember
                                    idUser={list.memberIdList}
                                    idMemberList={list.id}
                                    idProject={project.id}
                                  />
                                </>
                              ) : null}
                            </>
                          )}
                        </span>
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

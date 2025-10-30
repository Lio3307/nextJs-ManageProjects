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
        <div className="mb-6">
          <BreadcrumbWithCustomSeparator
            link={`/project/${idProject}`}
            name={project.title}
            currentPageName="Member List"
          />
        </div>

        <div className="mb-8 p-6 bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-xl flex items-center justify-center shadow-md">
              <Users
                className="w-6 h-6 text-white dark:text-gray-900"
                strokeWidth={2.5}
              />
            </div>
            <div>
              <h3 className="text-2xl  font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
                Member List
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
                  <p className="text-xs lg:text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {memberListData?.length || 0} member
                    {(memberListData?.length || 0) !== 1 ? "s" : ""}
                  </p>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  in this project
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {memberListData?.length === 0 || !memberListData ? (
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-850 rounded-2xl"></div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-2xl"></div>

              <div className="relative flex flex-col items-center justify-center p-12 lg:p-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl transition-colors duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Users className="w-10 h-10 text-gray-500 dark:text-gray-400" />
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-3">
                  No members found
                </h2>
                <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 text-center max-w-md">
                  This project doesnt have any members yet
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
              <div className="divide-y-2 divide-gray-100 dark:divide-gray-800">
                {memberListData.map((list) => (
                  <div
                    key={list.id}
                    className="group p-5 lg:p-6 hover:bg-gray-50 dark:hover:bg-gray-850 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-100 rounded-full flex items-center justify-center shadow-md ring-2 ring-gray-100 dark:ring-gray-800 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <span className="text-white dark:text-gray-900 font-bold text-base">
                            {list.memberList?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-base lg:text-lg font-bold text-gray-900 dark:text-gray-100 truncate">
                            {list.memberList}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                            Project{" "}
                            {project.userId === list.memberIdList
                              ? "Owner"
                              : "Member"}
                          </p>
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        {project.userId === list.memberIdList ? (
                          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 text-white dark:text-gray-900 border-2 border-gray-900 dark:border-gray-100 shadow-lg font-bold text-sm">
                            <Crown className="w-4 h-4" strokeWidth={2.5} />
                            <span>Owner</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-gray-200 dark:border-gray-700 shadow-md font-bold text-sm">
                            <UserRound className="w-4 h-4" strokeWidth={2.5} />
                            <span>Member</span>
                            {session.user.id === project.userId && (
                              <div className="ml-1 pl-2 border-l-2 border-gray-300 dark:border-gray-600">
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

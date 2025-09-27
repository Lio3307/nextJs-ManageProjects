import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumb-custom";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Crown, UserRound } from "lucide-react";
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
    <div className="p-4 lg:p-6 max-w-4xl mx-auto">
      <BreadcrumbWithCustomSeparator
        link={`/project/${idProject}`}
        name={project.title}
        currentPageName="Member List"
      />
      <div className="my-6">
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Member List
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          {memberListData?.length || 0} member
          {(memberListData?.length || 0) !== 1 ? "s" : ""} in this project
        </p>
      </div>

      <div className="space-y-3">
        {memberListData.length === 0 || !memberListData ? (
          <div className="flex flex-col items-center justify-center p-8 lg:p-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 text-center mb-2">
              No members found
            </h2>
            <p className="text-sm text-gray-500 text-center">
              This project doesnt have any members yet
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {memberListData.map((list) => (
                <div
                  key={list.id}
                  className="p-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-sm">
                          {list.memberList?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {list.memberList}
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          session.user.id === project?.userId
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-blue-100 text-blue-800 border border-blue-200"
                        }`}
                      >
                        {session.user.id === project?.userId ? (
                          <>
                            <Crown className="h-[0.84rem]" />
                            Owner
                          </>
                        ) : (
                          <>
                            <UserRound className="h-[0.84rem]"/>
                            Member
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
  );
}

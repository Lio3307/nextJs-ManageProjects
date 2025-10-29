import { actionRequest } from "@/app/actions/handle-join-request";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Users, Check, X, Info } from "lucide-react";
import { Suspense } from "react";
import JoinRequestSkeleton from "@/components/loading-skeleton/request-join-skeleton";

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

  const joinStatus = await prisma.joinStatus.findFirst({
    where: {
      idProject,
    },
  });

  return (
    <Suspense fallback={<JoinRequestSkeleton />}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="bg-gray-900 px-6 py-8 sm:px-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Join Requests
                </h2>
              </div>
              <p className="text-gray-300 text-sm sm:text-base">
                Review and manage users requesting to join your project
              </p>

              {requestList.length > 0 && (
                <div className="mt-4 bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="bg-gray-700 rounded-full p-1">
                        <Info className="h-4 w-4 text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-300">
                        <span className="font-medium">Tip:</span> Review each
                        request carefully before accepting or rejecting.
                        Accepted members will gain access to your project.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {requestList.length > 0 && (
                <div className="mt-4 inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-white text-sm font-medium">
                    {requestList.length} pending request
                    {requestList.length !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              {requestList.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 sm:py-16">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-6 mb-6">
                    <Users className="h-16 w-16 text-gray-500 dark:text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Requests Yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center max-w-md text-sm sm:text-base">
                    There are currently no pending join requests for this
                    project.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {requestList.map((request, index) => (
                    <div
                      key={request.id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all duration-200"
                    >
                      <form action={actionRequest}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                            <div className="bg-gray-800 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg shadow-sm flex-shrink-0">
                              {request.userName.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">
                                Request #{index + 1}
                              </p>
                              <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                                {request.userName}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2 sm:gap-3 flex-shrink-0">
                            <input
                              type="hidden"
                              name="id-project"
                              value={idProject}
                            />
                            <input
                              type="hidden"
                              name="user-id"
                              value={request.userId}
                            />
                            <input
                              type="hidden"
                              name="id-req"
                              value={request.id}
                            />
                            <input
                              type="hidden"
                              name="join-status-id"
                              value={joinStatus!.id}
                            />
                            <button
                              name="action"
                              value="accept"
                              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                            >
                              <Check className="h-4 w-4" />
                              <span className="hidden xs:inline">Accept</span>
                            </button>
                            <button
                              name="action"
                              value="reject"
                              className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                            >
                              <X className="h-4 w-4" />
                              <span className="hidden xs:inline">Reject</span>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

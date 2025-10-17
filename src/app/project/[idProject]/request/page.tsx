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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Join Requests
            </h2>
            <p className="text-gray-600">
              Manage users requesting to join your project
            </p>
          </div>

          {requestList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <svg
                  className="w-16 h-16 text-gray-400"
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
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Requests Yet
              </h3>
              <p className="text-gray-500 text-center max-w-md">
                There are currently no pending join requests for this project.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {requestList.map((request, index) => (
                <div
                  key={request.id}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition duration-300"
                >
                  <form action="">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                          {request.userName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium mb-1">
                            Request #{index + 1}
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {request.userName}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <input type="hidden" name="id-project" value={idProject}/>
                        <input type="hidden" name="user-id" value={request.userId} />
                        <input type="hidden" name="id-req" value={request.id} />
                        <button
                        name="action"
                        value="accept"
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition duration-200 shadow-sm hover:shadow-md">
                          Accept
                        </button>
                        <button 
                        name="action"
                        value="reject"
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition duration-200 shadow-sm hover:shadow-md">
                          Reject
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
  );
}

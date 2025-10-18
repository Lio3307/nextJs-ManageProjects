import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Inbox } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function JoinStatus() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/login");

  const joinStatus = await prisma.joinStatus.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      project: true,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Project Join Status
        </h1>

        {joinStatus.length > 0 ? (
          <div className="space-y-4">
            {joinStatus.map((history) => (
              <div
                key={history.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {history.project.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {history.project.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      Created by:{" "}
                      <span className="font-medium">
                        {history.project.createdBy}
                      </span>
                    </p>
                  </div>
                  <div className="ml-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        history.status === "accept"
                          ? "bg-green-100 text-green-800"
                          : history.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {history.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="flex justify-center text-gray-400 mb-4">
              <Inbox className="h-16 w-16" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No history yet
            </h3>
            <p className="text-gray-500">
              You havent applied to join any projects yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumb-custom";
import CommentForm from "@/components/comment-component/comment-form";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ActionReport from "@/components/action-button/action-report";

export default async function ReportDetail({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const { reportId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return redirect("/login");

  const detailReport = await prisma.report.findUnique({
    where: {
      id: reportId,
    },
  });

  if (!detailReport) {
    return <p>No report matches...</p>;
  }

  const taskName = await prisma.task.findUnique({
    where: {
      id: detailReport.taskId,
    },
  });

  if (!taskName) throw new Error("Unknown Task");

  const getProjectOwnerId = await prisma.project.findUnique({
    where: {
      id: taskName.projectId,
    },
  });

  if (!getProjectOwnerId) throw new Error("Error get project");

  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <BreadcrumbWithCustomSeparator
                name={taskName.title}
                link={`/task/${detailReport.taskId}`}
                currentPageName="Report"
              />
            </div>

            {(session.user.id === detailReport.userId ||
              session.user.id === getProjectOwnerId.userId) && (
              <div className="flex-shrink-0">
                <ActionReport idReport={reportId} />
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-xs">
                  {detailReport.createdBy?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Created by</p>
                <p className="text-sm font-semibold text-gray-900">
                  {detailReport.createdBy}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Posted on</p>
                <p className="text-sm font-semibold text-gray-900">
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(new Date(detailReport.createdAt))}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                  clipRule="evenodd"
                />
                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
              </svg>
              Progress Report
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Report Title
              </h3>
            </div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">
              {detailReport.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Report Details
            </h3>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="prose prose-sm lg:prose-base max-w-none">
            <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
              {detailReport.description}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Comments & Discussion
              </h3>
              <p className="text-sm text-gray-600">
                Share feedback and collaborate
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <CommentForm reportId={reportId} />
        </div>
      </div>
    </div>
  );
}

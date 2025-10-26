import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumb-custom";
import CommentForm from "@/components/comment-component/comment-form";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ActionReport from "@/components/action-button/action-report";
import { Calendar, MessageCircle, Newspaper } from "lucide-react";
import CommentCard from "@/components/comment-component/comment-card";

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
    include: {
      task: true,
      comment: true
    },
  });

  if (!detailReport) {
    return <p>No report matches...</p>;
  }

  const getProjectOwnerId = await prisma.project.findUnique({
    where: {
      id: detailReport.task.projectId,
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
                name={detailReport.task.title}
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
                <Calendar className="w-4 h-4 text-green-600" />
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
              <Newspaper className="w-3 h-3 mr-1" />
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
              <MessageCircle className="w-4 h-4 text-white" />
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

        <div className="px-6 py-6">
          <CommentCard dataComments={detailReport.comment} />
        </div>
      </div>
    </div>
  );
}

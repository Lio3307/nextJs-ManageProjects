import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumb-custom";
import CommentForm from "@/components/comment-component/comment-form";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ActionReport from "@/components/action-button/action-report";
import { Calendar, FileText, MessageCircle, Newspaper } from "lucide-react";
import CommentCard from "@/components/card/comment-card";
import { Suspense } from "react";
import ReportDetailSkeleton from "@/components/loading-skeleton/report-skeleton";

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
      comment: true,
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
    <Suspense fallback={<ReportDetailSkeleton />}>
      <div className="p-4 lg:p-6 space-y-6 lg:space-y-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
          <div className="px-6 lg:px-8 py-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-850 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                  <FileText className="w-5 h-5 text-white dark:text-gray-900" />
                </div>
                <div className="flex-1 min-w-0">
                  <BreadcrumbWithCustomSeparator
                    name={detailReport.task.title}
                    link={`/task/${detailReport.taskId}`}
                    currentPageName="Report"
                  />
                </div>
              </div>

              {(session.user.id === detailReport.userId ||
                session.user.id === getProjectOwnerId.userId) && (
                <div className="flex-shrink-0">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative">
                      <ActionReport
                        idTask={detailReport.taskId}
                        idReport={reportId}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="px-6 lg:px-8 py-6 lg:py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-8">
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-850 dark:to-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                <div className="w-11 h-11 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-100 rounded-full flex items-center justify-center shadow-lg ring-2 ring-gray-100 dark:ring-gray-800 flex-shrink-0">
                  <span className="text-white dark:text-gray-900 font-bold text-sm">
                    {detailReport.createdBy?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Created by
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {detailReport.createdBy}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-850 dark:to-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                <div className="w-11 h-11 bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-300 dark:to-gray-200 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  <Calendar className="w-5 h-5 text-white dark:text-gray-900" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Posted on
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(new Date(detailReport.createdAt))}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border border-gray-900 dark:border-gray-100 shadow-md">
                <Newspaper className="w-4 h-4" />
                <span>Progress Report</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-1.5 bg-gradient-to-b from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rounded-full animate-pulse"></div>
                  <h3 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Report Title
                  </h3>
                </div>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight pl-6">
                {detailReport.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
          <div className="px-6 lg:px-8 py-5 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 dark:from-gray-850 dark:via-gray-800 dark:to-gray-850 border-b border-gray-200 dark:border-gray-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-900/5 dark:from-gray-100/5 to-transparent rounded-full blur-2xl"></div>

            <div className="flex items-center space-x-3 relative z-10">
              <div className="h-8 w-1.5 bg-gradient-to-b from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rounded-full"></div>
                <h3 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Report Details
                </h3>
              </div>
            </div>
          </div>

          <div className="px-6 lg:px-8 py-8">
            <div className="prose prose-sm lg:prose-base max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-gray-100">
              <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {detailReport.description}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
          <div className="px-6 lg:px-8 py-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-850 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-2xl"></div>

            <div className="flex items-start space-x-4 relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white dark:text-gray-900" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  Comments & Discussion
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Share feedback and collaborate
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 lg:px-8 py-6 border-b border-gray-200 dark:border-gray-700">
            <CommentForm reportId={reportId} />
          </div>

          <div className="px-6 lg:px-8 py-6">
            <CommentCard dataComments={detailReport.comment} />
          </div>
        </div>
      </div>
    </Suspense>
  );
}

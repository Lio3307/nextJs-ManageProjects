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
  <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-800 overflow-hidden transition-colors duration-300">
    <div className="px-6 lg:px-8 py-5 border-b border-gray-200 dark:border-neutral-800">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-black dark:bg-neutral-800 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
            <FileText className="w-5 h-5 text-white dark:text-neutral-50" />
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
            <ActionReport idTask={detailReport.taskId} idReport={reportId} />
          </div>
        )}
      </div>
    </div>

    <div className="px-6 lg:px-8 py-6 lg:py-8 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-8">
      <div className="flex items-center space-x-3 p-4 rounded-xl bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="w-11 h-11 bg-black dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
          <span className="text-white dark:text-neutral-50 font-bold text-sm">
            {detailReport.createdBy?.charAt(0)?.toUpperCase() || "U"}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 dark:text-neutral-400 mb-1">Created by</p>
          <p className="text-sm font-semibold text-black dark:text-neutral-50 truncate">
            {detailReport.createdBy}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3 p-2 rounded-xl bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="w-11 h-11 bg-black dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
          <Calendar className="w-5 h-5 text-white dark:text-neutral-50" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 dark:text-neutral-400 mb-1">Posted on</p>
          <p className="text-sm font-semibold text-black dark:text-neutral-50">
            {new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date(detailReport.createdAt))}
          </p>
        </div>
      </div>
    </div>

    <div className="flex ml-4 mb-8">
      <div className="inline-flex gap-2 px-4 py-2 rounded-full text-xs font-bold bg-black dark:bg-neutral-50 text-white dark:text-black border border-black dark:border-neutral-50 shadow-md">
        <Newspaper className="w-4 h-4" />
        <span>Progress Report</span>
      </div>
    </div>

    <div className="space-y-4 mb-8">
      <div className="flex items-center ml-4 space-x-3">
        <div className="h-8 w-1.5 bg-black dark:bg-neutral-50 rounded-full"></div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-black dark:bg-neutral-50 rounded-full animate-pulse"></div>
          <h3 className="text-xs font-bold text-gray-700 dark:text-neutral-400 uppercase tracking-wider">Report Title</h3>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-black dark:text-neutral-50 leading-tight pl-6">
        {detailReport.title}
      </h1>
    </div>
  </div>

  <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-800 overflow-hidden transition-colors duration-300">
    <div className="px-6 lg:px-8 py-8">
      <div className="prose prose-sm lg:prose-base max-w-none dark:prose-invert prose-headings:text-black dark:prose-headings:text-neutral-50 prose-p:text-gray-700 dark:prose-p:text-neutral-300 prose-strong:text-black dark:prose-strong:text-neutral-50">
        <p className="text-base lg:text-lg leading-relaxed whitespace-pre-wrap">
          {detailReport.description}
        </p>
      </div>
    </div>
  </div>

  <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-800 overflow-hidden transition-colors duration-300">
    <div className="px-6 lg:px-8 py-6 border-b border-gray-200 dark:border-neutral-800 flex items-start space-x-4">
      <div className="w-12 h-12 bg-black dark:bg-neutral-800 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
        <MessageCircle className="w-6 h-6 text-white dark:text-neutral-50" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-xl lg:text-2xl font-bold text-black dark:text-neutral-50 mb-1">Comments & Discussion</h3>
        <p className="text-sm text-gray-600 dark:text-neutral-400">Share feedback and collaborate</p>
      </div>
    </div>

    <div className="px-6 lg:px-8 py-6 border-b border-gray-200 dark:border-neutral-800">
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

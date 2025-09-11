import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumb-custom";
import CommentForm from "@/components/comment-component/comment-form";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DeleteReport from "@/components/delete-button/delete-report";

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
    <>
      <div className="p-4">
        <div className="flex justify-between">
          <BreadcrumbWithCustomSeparator
            name={taskName.title}
            link={`/task/${detailReport.taskId}`}
            currentPageName="Report"
          />
          {session.user.id === detailReport.userId ||
          session.user.id === getProjectOwnerId.userId ? (
            <DeleteReport idReport={reportId} />
          ) : (
            ""
          )}
        </div>
        <p className="text-gray-600 my-2 text-xs">
          Posted at :{" "}
          <span className="text-black font-bold">
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(detailReport.createdAt)}
          </span>
        </p>
        <p className="text-xs my-2 text-gray-600">
          Report by :{" "}
          <span className="text-black font-bold">{detailReport.createdBy}</span>{" "}
        </p>

        <div className="my-5 p-4">
          <h2 className="text-3xl font-bold font-sans my-3">
            {detailReport.title}
          </h2>
          <p className="my-2 text-gray-600">{detailReport.description}</p>
        </div>
      </div>

      <div className="flex justify-center p-5 ">
        <CommentForm reportId={reportId} />
      </div>
    </>
  );
}

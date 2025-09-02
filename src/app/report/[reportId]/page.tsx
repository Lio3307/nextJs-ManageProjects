import prisma from "@/lib/prisma";

export default async function ReportDetail({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const { reportId } = await params;
  const detailReport = await prisma.report.findUnique({
    where: {
      id: reportId,
    },
  });

  if (!detailReport) {
    return <p>No report matches...</p>;
  }

  return (
    <>
      <div className="p-4">
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
            <h2 className="text-3xl font-bold font-sans my-3">{detailReport.title}</h2>
            <p className="my-2 text-gray-600">{detailReport.description}</p>
        </div>
      </div>
    </>
  );
}

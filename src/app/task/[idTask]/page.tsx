import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Task({
  params,
}: {
  params: Promise<{ idTask: string }>;
}) {
  const { idTask } = await params;

  const data = await prisma.project.findUnique({
    where: {
      id: idTask,
    },
  });

  if (!data) {
    return notFound();
  }

  return (
    <div className="w-full min-h-screen bg-white px-4 md:px-12 lg:px-24 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm text-gray-600 mb-6">
        <p>
          By{" "}
          <span className="font-medium text-gray-800">{data.createdBy}</span>
        </p>
        <p>
          Created at{" "}
          <span className="font-medium text-gray-800">
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(data.createdAt)}
          </span>
        </p>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{data.title}</h1>

      {/* Content */}
      <div
        className="prose max-w-none text-gray-800 leading-relaxed
                   [&_pre]:bg-gray-900 [&_pre]:text-gray-100 
                   [&_pre]:rounded-lg [&_pre]:p-4 
                   [&_pre]:overflow-x-auto [&_pre]:max-w-full
                   [&_code]:font-mono [&_code]:text-sm
                   [&_pre_code]:whitespace-pre [&_pre_code]:break-words"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  );
}

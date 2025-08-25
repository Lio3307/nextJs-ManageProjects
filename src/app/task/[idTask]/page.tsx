import JSONRender from "@/components/json-content-parse/json-render";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftFromLine } from "lucide-react";

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
        <Link className={buttonVariants({variant: "secondary"})} href="/"><ArrowLeftFromLine/> Back</Link>
      <div className="flex mt-4 flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm text-gray-600 mb-6">
        <p>
          By <span className="font-medium text-gray-800">{data.createdBy}</span>
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

      <h1 className="text-3xl font-bold text-gray-900 mb-8">{data.title}</h1>

      <JSONRender content={JSON.parse(data.content)} />
    </div>
  );
}

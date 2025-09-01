"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import type { Report } from "@prisma/client";
import SubmitForm from "../submit-form";
import { handleReport } from "@/app/actions";

export default function ReportList({
  reportData,
  idTask,
}: {
  reportData: Report[];
  idTask: string;
}) {
  return (
    <>
      <div className="p-6 mb-6">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 px-6 py-6">
          <form action={handleReport} className="space-y-6">
            <div className="flex justify-end">
              <SubmitForm buttonName="Report" />
            </div>

            <div className="flex flex-col space-y-2">
              <Label className="text-sm font-medium text-gray-700">Title</Label>
              <Input name="title" type="text" required />
            </div>

            <div className="flex flex-col space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Report
              </Label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 resize-vertical text-sm transition-colors duration-200"
                name="description"
                required
                placeholder="Enter your report description..."
              />
              <input name="idTask" value={idTask} type="hidden" />
            </div>
          </form>
        </div>
        <div className="my-4">
          {!reportData || reportData.length === 0 ? (
            <p className="text-gray-600 text-sm text-center mt-6">
              No reports yet
            </p>
          ) : (
            reportData.map((data) => (
              <div
                key={data.id}
                className="m-4 rounded-lg p-4 bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <p className="text-xs text-gray-500 font-medium">
                    Report By:{" "}
                    <span className="text-gray-700 font-semibold">
                      {data.createdBy}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    Created At:{" "}
                    <span className="text-gray-700 font-semibold">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(data.createdAt)}
                    </span>
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <h1 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">
                    {data.title}
                  </h1>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {data.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

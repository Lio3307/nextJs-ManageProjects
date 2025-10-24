"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import type { Report } from "@prisma/client";
import SubmitForm from "../submit-form";
import { handleAddReport } from "@/app/actions/handle-add-report";
import Link from "next/link";
import { AlertTriangle, ChevronRight, File, MessageSquareWarning } from "lucide-react";

export default function ReportList({
  reportData,
  idTask,
}: {
  reportData: Report[];
  idTask: string;
}) {
  return (
    <div>
      <div className="bg-white rounded-sm shadow-lg border border-gray-200 overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
              <MessageSquareWarning className="text-white h-[0.89rem]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Create Report</h2>
              <p className="text-sm text-gray-600">
                Submit a detailed progress report
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <form action={handleAddReport} className="space-y-6">
            <div className="flex justify-end">
              <SubmitForm buttonName="Submit Report" />
            </div>

            <div className="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-red-800 mb-1">
                  Important Notice
                </h4>
                <p className="text-xs text-red-700">
                  Once submitted, reports cannot be edited or updated. Please
                  review carefully before submitting.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <Label className="text-sm font-semibold text-gray-900">
                  Report Title
                </Label>
                <span className="text-red-500 text-sm">*</span>
              </div>
              <Input
                name="title"
                type="text"
                required
                placeholder="Enter a clear, descriptive title for your report..."
                className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <Label className="text-sm font-semibold text-gray-900">
                  Report Content
                </Label>
                <span className="text-red-500 text-sm">*</span>
              </div>
              <textarea
                className="w-full min-h-[150px] lg:min-h-[180px] px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 resize-y text-sm transition-all duration-200 bg-white"
                name="description"
                required
                rows={6}
                placeholder="Provide detailed information about your progress, achievements, challenges, and next steps..."
              />
              <p className="text-xs text-gray-500">
                Include specific details about completed tasks, current status,
                and any blockers or issues
              </p>
              <input name="idTask" value={idTask} type="hidden" />
            </div>
          </form>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
              Previous Reports
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {reportData?.length || 0} report
              {(reportData?.length || 0) !== 1 ? "s" : ""} submitted
            </p>
          </div>
        </div>

        {!reportData || reportData.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 lg:p-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <File className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              No reports yet
            </h4>
            <p className="text-sm text-gray-500 text-center max-w-md">
              Start by creating your first report to track progress and document
              achievements
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reportData.map((data) => (
              <Link
                key={data.id}
                href={`/report/${data.id}`}
                className="block group"
              >
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-xs">
                            {data.createdBy?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Created by</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {data.createdBy}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-gray-500">Submitted</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }).format(new Date(data.createdAt))}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-5">
                    <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors duration-200 line-clamp-2">
                      {data.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {data.description}
                    </p>

                    <div className="flex items-center justify-end mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex items-center space-x-1 text-xs text-blue-600 font-medium">
                        <span>View Full Report</span>
                        <ChevronRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

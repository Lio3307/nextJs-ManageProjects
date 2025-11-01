"use client";

import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import type { Report } from "@prisma/client";
import SubmitForm from "../submit-form";
import { handleAddReport } from "@/app/actions/handle-add-report";
import { AlertTriangle, File, MessageSquareWarning } from "lucide-react";
import { toast } from "sonner";
import ReportCard from "../../card/report-card";

export default function ReportForm({
  reportData,
  idTask,
}: {
  reportData: Report[];
  idTask: string;
}) {
  const handleReport = async (formData: FormData) => {
    const { success, message } = await handleAddReport(formData);
    if (success) {
      toast.success(message as string);
    } else {
      toast.error(message as string);
    }
  };
  return (
    <>
      <div
        className="bg-white dark:bg-neutral-950 rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-800 overflow-hidden mb-8 transition-colors duration-300"
        role="region"
        aria-labelledby="create-report-heading"
      >
        <div className="px-6 lg:px-8 py-6 relative overflow-hidden bg-black/5 dark:bg-neutral-900/5">
          <div className="flex items-start space-x-4 relative z-10">
            <div className="w-12 h-12 bg-white/10 dark:bg-neutral-800 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 ring-2 ring-white/20 dark:ring-neutral-700">
              <MessageSquareWarning className="text-white dark:text-neutral-50 w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h2
                id="create-report-heading"
                className="text-xl lg:text-2xl font-bold text-black dark:text-neutral-50 mb-1"
              >
                Create Report
              </h2>
              <p className="text-sm text-gray-700 dark:text-neutral-300">
                Submit a detailed progress report
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 lg:px-8 py-8">
          <form action={handleReport} className="space-y-8">
            <div className="flex justify-end">
              <SubmitForm buttonName="Submit Report" />
            </div>

            <div className="relative overflow-hidden rounded-xl border-2 border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-900/20 transition-colors duration-300">
              <div className="flex items-start space-x-4 p-5 relative z-10">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-red-900 dark:text-red-300 mb-2">
                    Important Notice
                  </h4>
                  <p className="text-xs lg:text-sm text-red-800 dark:text-red-400 leading-relaxed">
                    Once submitted, reports cannot be edited or updated. Please
                    review carefully before submitting.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-6 w-1 bg-black dark:bg-neutral-50 rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-black dark:bg-neutral-50 rounded-full"></div>
                  <Label className="text-sm font-bold text-black dark:text-neutral-50 uppercase tracking-wide">
                    Report Title
                  </Label>
                  <span className="text-red-500 dark:text-red-400 text-sm font-semibold">
                    *
                  </span>
                </div>
              </div>
              <Input
                name="title"
                type="text"
                required
                placeholder="Enter a clear, descriptive title for your report..."
                className="h-12 lg:h-14 text-base px-4 border-2 border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-black dark:text-neutral-50 placeholder:text-gray-400 dark:placeholder:text-neutral-500 focus:border-black dark:focus:border-neutral-50 focus:ring-4 focus:ring-black/10 dark:focus:ring-neutral-50/10 transition-all duration-200 rounded-xl"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-6 w-1 bg-black dark:bg-neutral-50 rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-black dark:bg-neutral-50 rounded-full"></div>
                  <Label className="text-sm font-bold text-black dark:text-neutral-50 uppercase tracking-wide">
                    Report Content
                  </Label>
                  <span className="text-red-500 dark:text-red-400 text-sm font-semibold">
                    *
                  </span>
                </div>
              </div>
              <textarea
                className="w-full min-h-[180px] lg:min-h-[220px] px-4 py-4 border-2 border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-black dark:text-neutral-50 placeholder:text-gray-400 dark:placeholder:text-neutral-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-black/10 dark:focus:ring-neutral-50/10 focus:border-black dark:focus:border-neutral-50 resize-y text-sm lg:text-base transition-all duration-200"
                name="description"
                required
                rows={8}
                placeholder="Provide detailed information about your progress, achievements, challenges, and next steps..."
              />
              <div className="flex items-start space-x-2 p-3 bg-gray-50 dark:bg-neutral-900 rounded-lg border border-gray-200 dark:border-neutral-800">
                <div className="w-1 h-4 bg-black dark:bg-neutral-50 rounded-full mt-0.5 flex-shrink-0"></div>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">
                  Include specific details about completed tasks, current
                  status, and any blockers or issues
                </p>
              </div>
              <input name="idTask" value={idTask} type="hidden" />
            </div>
          </form>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-5 lg:p-6 bg-white dark:bg-neutral-950 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-lg transition-colors duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-black dark:bg-neutral-800 rounded-xl flex items-center justify-center shadow-md">
              <File className="w-6 h-6 text-white dark:text-neutral-50" />
            </div>
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-black dark:text-neutral-50">
                Previous Reports
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <div className="px-3 py-1 bg-gray-100 dark:bg-neutral-900 rounded-full border border-gray-200 dark:border-neutral-800">
                  <p className="text-xs lg:text-sm font-semibold text-black dark:text-neutral-50">
                    {reportData?.length || 0} report
                    {(reportData?.length || 0) !== 1 ? "s" : ""}
                  </p>
                </div>
                <span className="text-xs text-gray-500 dark:text-neutral-400">
                  submitted
                </span>
              </div>
            </div>
          </div>
        </div>

        {!reportData || reportData.length === 0 ? (
          <div className="relative overflow-hidden">
            <div className="relative flex flex-col items-center justify-center p-12 lg:p-16 border-2 border-dashed border-gray-300 dark:border-neutral-800 rounded-2xl transition-colors duration-300 bg-white dark:bg-neutral-950">
              <div className="w-20 h-20 bg-gray-200 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <File className="w-10 h-10 text-gray-500 dark:text-neutral-400" />
              </div>
              <h4 className="text-lg lg:text-xl font-bold text-black dark:text-neutral-50 mb-3">
                No reports yet
              </h4>
              <p className="text-sm lg:text-base text-gray-600 dark:text-neutral-400 text-center max-w-md leading-relaxed">
                Start by creating your first report to track progress and
                document achievements
              </p>
            </div>
          </div>
        ) : (
          <ReportCard reportData={reportData} />
        )}
      </div>
    </>
  );
}

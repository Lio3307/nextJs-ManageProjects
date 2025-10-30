"use client";

import { Report } from "@prisma/client";
import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ReportCard({ reportData }: { reportData: Report[] }) {
  return (
    <div className="space-y-5 lg:space-y-6">
      {reportData.map((data) => (
        <Link key={data.id} href={`/report/${data.id}`} className="block group">
          <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300 overflow-hidden relative">
            <div className="h-1 w-full bg-black dark:bg-neutral-50 group-hover:h-1.5 transition-all duration-300"></div>

            <div className="px-6 lg:px-8 py-5 border-b border-gray-200 dark:border-neutral-800 relative">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-black dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-md ring-2 ring-gray-100 dark:ring-neutral-700 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white dark:text-neutral-50 font-bold text-sm">
                      {data.createdBy?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-neutral-400 mb-0.5">
                      Created by
                    </p>
                    <p className="text-sm font-semibold text-black dark:text-neutral-50">
                      {data.createdBy}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 sm:text-right">
                  <div className="w-8 h-8 bg-black dark:bg-neutral-800 rounded-lg flex items-center justify-center shadow-sm sm:hidden">
                    <Calendar className="w-4 h-4 text-white dark:text-neutral-50" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-neutral-400 mb-0.5">
                      Submitted
                    </p>
                    <p className="text-sm font-semibold text-black dark:text-neutral-50">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }).format(new Date(data.createdAt))}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 lg:px-8 py-6 relative">
              <div className="flex items-start space-x-3 mb-4">
                <div className="h-12 w-1 bg-black dark:bg-neutral-50 rounded-full flex-shrink-0 mt-1"></div>
                <h4 className="text-lg lg:text-xl mt-3 font-bold text-black dark:text-neutral-50 leading-tight line-clamp-2 group-hover:text-black dark:group-hover:text-white transition-colors duration-200">
                  {data.title}
                </h4>
              </div>

              <p className="text-sm lg:text-base text-gray-600 dark:text-neutral-400 leading-relaxed line-clamp-3 mb-5 pl-5">
                {data.description}
              </p>

              <div className="flex items-center justify-end pt-4 border-t border-gray-200 dark:border-neutral-800">
                <div className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-black dark:bg-neutral-50 text-white dark:text-black shadow-md group-hover:shadow-lg">
                    <span className="text-xs font-bold">View Full Report</span>
                    <ChevronRight
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

"use client";

import { Report } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ReportCard({ reportData }: { reportData: Report[] }) {
  return (
    <div className="space-y-5 lg:space-y-6">
      {reportData.map((data) => (
        <Link key={data.id} href={`/report/${data.id}`} className="block group">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gray-900/5 dark:from-gray-100/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

            <div className="h-1 w-full bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 dark:from-gray-100 dark:via-gray-400 dark:to-gray-100 group-hover:h-1.5 transition-all duration-300"></div>

            <div className="px-6 lg:px-8 py-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-850 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 relative">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-100 rounded-full flex items-center justify-center shadow-md ring-2 ring-gray-100 dark:ring-gray-800 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white dark:text-gray-900 font-bold text-sm">
                      {data.createdBy?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                      Created by
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {data.createdBy}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 sm:text-right">
                  <div className="w-8 h-8 bg-gray-700 dark:bg-gray-300 rounded-lg flex items-center justify-center shadow-sm sm:hidden">
                    <svg
                      className="w-4 h-4 text-white dark:text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                      Submitted
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
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
                <div className="h-12 w-1 bg-gradient-to-b from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 rounded-full flex-shrink-0 mt-1"></div>
                <h4 className="text-lg lg:text-xl mt-3 font-bold text-gray-900 dark:text-gray-100 leading-tight line-clamp-2 group-hover:text-black dark:group-hover:text-white transition-colors duration-200">
                  {data.title}
                </h4>
              </div>

              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 mb-5 pl-5">
                {data.description}
              </p>

              <div className="flex items-center justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-md group-hover:shadow-lg">
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

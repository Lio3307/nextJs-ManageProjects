"use client";

import { Report } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ReportCard({ reportData }: { reportData: Report[] }) {
  return (
    <div className="space-y-4">
      {reportData.map((data) => (
        <Link key={data.id} href={`/report/${data.id}`} className="block group">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
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
              <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 duration-200 line-clamp-2">
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
  );
}

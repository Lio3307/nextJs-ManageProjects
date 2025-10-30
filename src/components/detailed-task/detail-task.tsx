"use client";

import { Calendar, NotepadText } from "lucide-react";
import JSONRender from "../json-content-parse-richeditor/json-render";
import type { Task } from "@prisma/client";

export default function DetailedTask({ detailedTask }: { detailedTask: Task }) {
  return (
    <div className="w-full space-y-6">
      <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-md border border-gray-200 dark:border-neutral-800 overflow-hidden transition-colors duration-300">
        <div className="px-6 lg:px-8 py-6 border-b border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-950">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-gray-100 dark:bg-neutral-900 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
              <NotepadText className="text-gray-900 dark:text-neutral-50 w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-neutral-50 mb-1">
                Task Details
              </h1>
              <p className="text-sm text-gray-600 dark:text-neutral-200">
                View task information and content
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
              <div className="w-10 h-10 bg-gray-200 dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-md flex-shrink-0 ring-2 ring-gray-100 dark:ring-neutral-700">
                <span className="text-gray-900 dark:text-neutral-50 font-bold text-sm">
                  {detailedTask.createdBy?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-neutral-200 mb-0.5">
                  Created by
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-neutral-50 truncate">
                  {detailedTask.createdBy}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
              <div className="w-10 h-10 bg-gray-200 dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                <Calendar className="text-gray-900 dark:text-neutral-50 w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-neutral-200 mb-0.5">
                  Created on
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-neutral-50">
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(new Date(detailedTask.createdAt))}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 lg:px-8 py-6 bg-white dark:bg-neutral-950">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-8 w-1.5 bg-gray-900 dark:bg-neutral-50 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-900 dark:bg-neutral-50 rounded-full animate-pulse"></div>
              <h2 className="text-xs font-bold text-gray-700 dark:text-neutral-200 uppercase tracking-wider">
                Task Title
              </h2>
            </div>
          </div>
          <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-neutral-50 leading-tight pl-6">
            {detailedTask.title}
          </h3>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-md border border-gray-200 dark:border-neutral-800 overflow-hidden transition-colors duration-300">
        <div className="px-6 lg:px-8 py-5 border-b border-gray-200 dark:border-neutral-800 relative overflow-hidden">
          <div className="flex items-center space-x-3 relative z-10">
            <div className="h-8 w-1.5 bg-gray-900 dark:bg-neutral-50 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-900 dark:bg-neutral-50 rounded-full"></div>
              <h3 className="text-xs font-bold text-gray-700 dark:text-neutral-200 uppercase tracking-wider">
                Task Description
              </h3>
            </div>
          </div>
        </div>

        <div className="px-6 lg:px-8 py-8">
          <div className="prose prose-sm lg:prose-base max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-neutral-50 prose-p:text-gray-700 dark:prose-p:text-neutral-200 prose-strong:text-gray-900 dark:prose-strong:text-neutral-50 prose-code:text-gray-900 dark:prose-code:text-neutral-50 prose-pre:bg-gray-100 dark:prose-pre:bg-neutral-800 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-neutral-800">
            <JSONRender content={JSON.parse(detailedTask.content)} />
          </div>
        </div>
      </div>
    </div>
  );
}

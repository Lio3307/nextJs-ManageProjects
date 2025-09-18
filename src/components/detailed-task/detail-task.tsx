"use client";

import JSONRender from "../json-content-parse/json-render";
import type { Task } from "@prisma/client";

export default function DetailedTask({ detailedTask }: { detailedTask: Task }) {
  return (
    <div className="w-full">
      <div className="bg-white rounded-sm shadow-lg border border-gray-200 overflow-hidden mb-6">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Task Details
              </h1>
              <p className="text-sm text-gray-600">
                View task information and content
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-xs">
                  {detailedTask.createdBy?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-600">Created by</p>
                <p className="text-sm font-semibold text-gray-900">
                  {detailedTask.createdBy}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-600">Created on</p>
                <p className="text-sm font-semibold text-gray-900">
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

        <div className="px-6 py-5 bg-white">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Task
            </h2>
          </div>
          <h3 className="text-md font-bold text-gray-900 leading-tight">
            {detailedTask.title}
          </h3>
        </div>
      </div>

      <div className="bg-white rounded-sm shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Task Description
            </h3>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="prose prose-sm lg:prose-base max-w-none">
            <JSONRender content={JSON.parse(detailedTask.content)} />
          </div>
        </div>
      </div>
    </div>
  );
}

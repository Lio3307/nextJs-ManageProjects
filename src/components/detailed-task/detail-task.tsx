"use client";

import { Calendar, NotepadText } from "lucide-react";
import JSONRender from "../json-content-parse/json-render";
import type { Task } from "@prisma/client";

export default function DetailedTask({ detailedTask }: { detailedTask: Task }) {
  return (
    <div className="w-full">
      <div className="bg-white rounded-sm shadow-lg border border-gray-200 overflow-hidden mb-6">
        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center shadow-sm">
              <NotepadText className="text-white" />
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
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
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
              <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                <Calendar className="text-white h-[0.97rem]" />
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

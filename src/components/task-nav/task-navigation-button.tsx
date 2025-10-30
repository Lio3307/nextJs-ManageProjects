"use client";

import { Suspense, useState } from "react";
import DetailedTask from "../detailed-task/detail-task";
import type { Task, Report } from "@prisma/client";
import DetailedTaskSkeleton from "../loading-skeleton/detailed-task-skeleton";
import ReportForm from "../reports/report-form";
import ReportListSkeleton from "../loading-skeleton/report-list-skeleton";

export default function TaskNav({
  idTask,
  taskData,
  reportData,
}: {
  idTask: string;
  taskData: Task;
  reportData: Report[];
}) {
  const [currentNav, setCurrentNav] = useState<string>("Task");

  const navItems = [
    { id: 1, name: "Task" },
    { id: 2, name: "Report" },
  ];

  return (
    <>
      <div className="flex my-4 bg-gray-100 dark:bg-neutral-950 rounded-xl p-1 shadow-inner">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`flex-1 py-2 px-4 text-sm font-semibold transition-all duration-200 ease-in-out first:rounded-l-lg last:rounded-r-lg
          ${
            currentNav === item.name
              ? "bg-white dark:bg-neutral-800 text-gray-900 dark:text-neutral-50 shadow-md transform scale-[0.98]"
              : "text-gray-600 dark:text-neutral-200 hover:text-gray-900 dark:hover:text-neutral-50 hover:bg-white/50 dark:hover:bg-neutral-800/50"
          }`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentNav(item.name);
            }}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {currentNav === "Task" ? (
          <Suspense fallback={<DetailedTaskSkeleton />}>
            <DetailedTask detailedTask={taskData} />
          </Suspense>
        ) : (
          <Suspense fallback={<ReportListSkeleton />}>
            <ReportForm idTask={idTask} reportData={reportData} />
          </Suspense>
        )}
      </div>
    </>
  );
}

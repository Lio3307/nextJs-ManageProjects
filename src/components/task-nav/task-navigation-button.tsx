"use client";

import { useState } from "react";
import DetailedTask from "../detailed-task/detail-task";
import ReportList from "../report-list/report-list";
import type { Task, Report } from "@prisma/client";

export default function TaskNav({
  idTask,
  taskData,
  reportData,
}: {
  idTask: string;
  taskData: Task;
  reportData: Report[];
}){
  const [currentNav, setCurrentNav] = useState<string>("Task");

  const navItems = [
    { id: 1, name: "Task" },
    { id: 2, name: "Report" },
  ];

  return (
    <>
      <div className="flex my-2 rounded-xl">
        {navItems.map((item) => (
          <button
            className={`border border-black ${
              currentNav === item.name
                ? "bg-black dark:bg-white text-white font-bold dark:text-black"
                : ""
            } py-1 px-4 cursor-pointer font-bold  text-sm`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentNav(item.name);
            }}
            key={item.id}
          >
            {item.name}
          </button>
        ))}
      </div>

       {currentNav === "Task" ? (
        <DetailedTask detailedTask={taskData} />
      ) : (
        <ReportList idTask={idTask} reportData={reportData} />
      )}
    </>
  );
}

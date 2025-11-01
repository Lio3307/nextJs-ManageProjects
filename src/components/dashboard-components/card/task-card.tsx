import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronRight, NotepadText } from "lucide-react";

type TaskProps = {
  id: string;
  title: string;
  createdBy: string;
};

export default function TaskCard({ data }: { data: TaskProps }) {
  return (
    <Link 
      href={`/dashboard/task/${data.id}`} 
      className="block w-full h-full"
      aria-label={`View task ${data.title}`}
    >
      <div className="group transition-all duration-300">
        <Card 
          className="w-full h-full cursor-pointer flex flex-col rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md bg-white dark:bg-neutral-950 transition-all duration-300 overflow-hidden"
          role="article"
          aria-labelledby={`task-title-${data.id}`}
        >
          <div className="h-1 w-full bg-neutral-900 dark:bg-neutral-100 group-hover:h-1.5 transition-all duration-300"></div>

          <CardHeader className="pt-6 pb-4 px-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105">
                <NotepadText className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors" />
              </div>

              <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600 group-hover:bg-neutral-900 dark:group-hover:bg-neutral-100 transition-all duration-300 group-hover:scale-125"></div>
            </div>

            <CardTitle 
              id={`task-title-${data.id}`}
              className="text-lg lg:text-xl font-bold line-clamp-2 text-neutral-900 dark:text-neutral-100 group-hover:text-black dark:group-hover:text-white leading-tight transition-colors min-h-[3.5rem]"
            >
              {data.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col justify-between flex-1 px-6 pb-5">
            <div className="flex-1 mb-5">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                Click to view task details
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-full flex items-center justify-center font-bold text-sm shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105 ring-2 ring-neutral-100 dark:ring-neutral-900">
                  {data.createdBy?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="max-w-[110px]">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Created by
                  </p>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                    {data.createdBy}
                  </p>
                </div>
              </div>

              <div className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                  <span>View</span>
                  <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}

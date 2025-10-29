import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ChevronRight, NotepadText } from "lucide-react";

type TaskProps = {
  id: string;
  title: string;
  createdBy: string;
};

export default function TaskCard({ data }: { data: TaskProps }) {
  return (
<Link href={`/task/${data.id}`} className="block w-full h-full">
  <div className="group transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]">
    <Card className="w-full h-full cursor-pointer flex flex-col rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 dark:hover:shadow-gray-900/70 transition-all duration-300 overflow-hidden bg-white dark:bg-gray-900">
      <div className="h-1 w-full bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-gray-100 dark:via-gray-300 dark:to-gray-100 group-hover:h-1.5 transition-all duration-300"></div>

      <CardHeader className="pt-6 pb-4 px-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 group-hover:from-gray-900 group-hover:to-gray-800 dark:group-hover:from-gray-100 dark:group-hover:to-gray-200 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
            <NotepadText className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-gray-900 transition-colors duration-300" />
          </div>
          
          <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 group-hover:bg-gray-900 dark:group-hover:bg-gray-100 transition-all duration-300 group-hover:scale-125"></div>
        </div>

        <CardTitle className="text-lg lg:text-xl font-bold line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white leading-tight transition-colors duration-200 min-h-[3.5rem]">
          {data.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col justify-between flex-1 px-6 pb-5">
        <div className="flex-1 mb-5">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
            Click to view task details
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-100 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300 ring-2 ring-gray-100 dark:ring-gray-800">
              <span className="text-white dark:text-gray-900 font-bold text-sm">
                {data.createdBy?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Created by</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[100px]">
                {data.createdBy}
              </p>
            </div>
          </div>

          <div className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs text-gray-900 dark:text-gray-100 font-semibold">
              <span>View</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</Link>
  );
}

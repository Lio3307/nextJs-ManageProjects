import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Folder, User } from "lucide-react";

type ProjectProps = {
  id: string;
  title: string;
  userId: string;
  createdBy: string;
};

export default function ProjectCard({ data }: { data: ProjectProps }) {
  return (
    <Link 
      href={`/dashboard/project/${data.id}`} 
      className="group block w-full h-full"
      aria-label={`View project ${data.title}`}
    >
      <Card 
        className="w-full h-full cursor-pointer flex flex-col shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-neutral-800 rounded-2xl overflow-hidden bg-white dark:bg-neutral-950 relative"
        role="article"
        aria-labelledby={`project-title-${data.id}`}
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-black/5 dark:bg-white/5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-125 transition-transform duration-300"></div>

        <CardHeader className="py-5 px-6 bg-black dark:bg-white relative overflow-hidden">
          <div className="flex items-start justify-between gap-4 relative z-10">
            <div className="flex-1 min-w-0">
              <CardTitle 
                id={`project-title-${data.id}`}
                className="text-lg lg:text-xl font-bold line-clamp-2 text-white dark:text-black group-hover:text-gray-100 dark:group-hover:text-gray-900 transition-colors duration-200 leading-tight"
              >
                {data.title}
              </CardTitle>
            </div>
            <div className="flex-shrink-0 w-11 h-11 bg-white/10 dark:bg-black/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 dark:group-hover:bg-black/20 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-md">
              <Folder
                className="w-6 h-6 text-white dark:text-black"
                strokeWidth={2.5}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col justify-between flex-1 p-5">
          <div className="flex items-center justify-between space-x-4 mt-1">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 flex-shrink-0 ring-2 ring-gray-100 dark:ring-neutral-800 group-hover:ring-gray-900 dark:group-hover:ring-white">
                <span className="text-white dark:text-black font-bold text-sm">
                  {data.createdBy?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  Created by
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-black dark:group-hover:text-gray-100 transition-colors duration-200">
                  {data.createdBy}
                </p>
              </div>
            </div>

            <div className="flex-shrink-0 w-9 h-9 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white transition-all duration-300 shadow-sm group-hover:shadow-md">
              <ArrowRight
                className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-white dark:group-hover:text-black group-hover:translate-x-1 transition-all duration-300"
                strokeWidth={2.5}
              />
            </div>
          </div>
        </CardContent>

        <div className="h-1.5 bg-black dark:bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </Card>
    </Link>
  );
}

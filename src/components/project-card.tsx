import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type ProjectProps = {
  id: string;
  title: string;
  userId: string;
  createdBy: string;
};

export default function ProjectCard({ data }: { data: ProjectProps }) {
  return (
    <Link href={`/project/${data.id}`} className="group block w-full h-full">
      <Card className="w-full h-full cursor-pointer flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 rounded-xl overflow-hidden bg-white group-hover:border-blue-300">
        <CardHeader className="pb-3 bg-gradient-to-br from-gray-50 to-blue-50 group-hover:from-blue-50 group-hover:to-indigo-50 transition-colors duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">
                {data.title?.charAt(0)?.toUpperCase() || "P"}
              </span>
            </div>
          </div>

          <CardTitle className="text-lg font-bold line-clamp-2 text-gray-900 group-hover:text-blue-900 transition-colors duration-200 leading-tight">
            {data.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col justify-between flex-1 p-2">
          <div className="flex items-center space-x-2 mt-2 border-t border-gray-100">
            <div className="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-xs">
                {data.createdBy?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Created by</p>
              <p className="text-xs font-semibold text-gray-900 truncate">
                {data.createdBy}
              </p>
            </div>
          </div>
        </CardContent>

        <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </Card>
    </Link>
  );
}

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
      <Card className="w-full h-full cursor-pointer flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 rounded-xl overflow-hidden bg-white group-hover:border-gray-400">
        <CardHeader className="py-3 bg-gray-600 from-gray-50 to-blue-50 group-hover:from-white-50 group-hover:to-gray-50 transition-colors duration-300">

          <CardTitle className="text-lg text-center font-bold line-clamp-2 text-white  transition-colors duration-200 leading-tight">
            {data.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col justify-between flex-1 p-2">
          <div className="flex items-center space-x-2 mt-2 border-t border-gray-100">
            <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
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

        <div className="h-1 bg-gray-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </Card>
    </Link>
  );
}

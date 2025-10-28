import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowRight, Folder, User } from "lucide-react";

type ProjectProps = {
  id: string;
  title: string;
  userId: string;
  createdBy: string;
};

export default function ProjectCard({ data }: { data: ProjectProps }) {
  return (
     <Link href={`/project/${data.id}`} className="group block w-full h-full">
      <Card className="w-full h-full cursor-pointer flex flex-col shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-2 border-gray-100 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50 group-hover:border-blue-400 group-hover:from-blue-50 group-hover:to-white relative">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-transparent rounded-bl-full transform translate-x-6 -translate-y-6 group-hover:scale-150 transition-transform duration-500"></div>
        
        <CardHeader className="py-4 px-5 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <div className="flex items-start justify-between gap-3 relative z-10">
            <div className="flex-1">
              <CardTitle className="text-lg font-bold line-clamp-2 text-white group-hover:text-blue-50 transition-colors duration-200 leading-tight">
                {data.title}
              </CardTitle>
            </div>
            <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 group-hover:rotate-12 transition-all duration-300">
              <Folder className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col justify-between flex-1 p-4">
          <div className="flex items-center justify-between space-x-3 mt-1">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                <span className="text-white font-bold text-sm">
                  {data.createdBy?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 mb-0.5 flex items-center gap-1">
                  <User className="w-3 h-3" />
                  Created by
                </p>
                <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
                  {data.createdBy}
                </p>
              </div>
            </div>
            
            <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-all duration-300">
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        </CardContent>

        <div className="h-1.5 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </Card>
    </Link>
  );
}

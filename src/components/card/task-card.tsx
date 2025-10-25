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
      <div className="group transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02]">
        <Card className="w-full h-full cursor-pointer flex flex-col rounded-xl border border-gray-200 shadow-md hover:shadow-2xl hover:border-gray-300 transition-all duration-300 overflow-hidden bg-white">
          <div className="h-1.5 w-full bg-gradient-to-r from-gray-500 to-gray-500 group-hover:from-gray-600 group-hover:to-gray-600 transition-colors duration-300"></div>

          <CardHeader className="pt-5 pb-3 px-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 bg-gradient-to-br from-gray-100 to-gray-100 group-hover:from-gray-200 group-hover:to-gray-200 rounded-lg flex items-center justify-center transition-colors duration-300">
                <NotepadText />
              </div>
            </div>

            <CardTitle className="text-base lg:text-lg font-bold line-clamp-2 text-gray-900 group-hover:text-gray-900 leading-tight transition-colors duration-200">
              {data.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col justify-between flex-1 px-5 pb-4">
            <div className="flex-1 mb-4">
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                Click to view task details
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">
                    {data.createdBy?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Created by</p>
                  <p className="text-xs font-semibold text-gray-800 truncate max-w-[80px]">
                    {data.createdBy}
                  </p>
                </div>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex items-center space-x-1 text-xs text-gray-600 font-medium">
                  <span>View</span>
                  <ChevronRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}

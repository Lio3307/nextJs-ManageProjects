import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

type TaskProps = {
  id: string;
  title: string;
  createdBy: string;
};

export default function TaskCard({ data }: { data: TaskProps }) {
  return (
    <Link href={`/task/${data.id}`}>
      <div className="group transition-all duration-300 transform hover:-translate-y-1">
        <Card className="w-full h-full cursor-pointer flex flex-col rounded-2xl border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <div className="h-2 w-full bg-blue-500 rounded-t-2xl"></div>

          <CardHeader className="pt-4 pb-2">
            <CardTitle className="text-lg font-bold line-clamp-2 text-gray-900 leading-tight">
              {data.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-between flex-1 px-4 py-2">
            <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100">
              <p>
                By:{" "}
                <span className="font-medium text-gray-800">
                  {data.createdBy}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}

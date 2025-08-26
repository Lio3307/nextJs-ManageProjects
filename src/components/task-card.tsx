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
      <Card className="w-full h-full cursor-pointer flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200 border border-border rounded-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {data.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-between flex-1">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <p>
              By:{" "}
              <span className="font-medium text-foreground">
                {data.createdBy}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

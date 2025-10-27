import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectSkeleton() {
  return (
    <div className="p-4 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col p-4 lg:p-6 shadow-lg rounded-xl bg-white border border-gray-100">
        <div className="flex sm:flex-row justify-between sm:items-start gap-3 sm:gap-0">
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-4 w-32 bg-gray-300/70 rounded" />
            <Skeleton className="h-4 w-40 bg-gray-300/70 rounded" />
          </div>
          <Skeleton className="h-8 w-28 rounded-md bg-gray-300/80" />
        </div>

        <div className="my-4">
          <Skeleton className="h-6 w-32 rounded-full bg-gray-300/70" />
        </div>

        <div className="space-y-3 mt-2">
          <Skeleton className="h-5 w-24 bg-gray-300/60" />
          <Skeleton className="h-6 w-3/4 bg-gray-300/80 rounded" />
          <Skeleton className="h-4 w-5/6 bg-gray-300/60 rounded" />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 pt-4 border-t border-gray-300">
          <Skeleton className="h-6 w-40 bg-gray-300/60 rounded" />
          <Skeleton className="h-8 w-28 bg-gray-300/70 rounded-md" />
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-36 bg-gray-300/70 rounded" />
          <Skeleton className="h-4 w-20 bg-gray-300/60 rounded" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card
              key={i}
              className="w-full h-32 flex flex-col justify-between border border-gray-200 shadow-sm rounded-xl p-3 bg-white"
            >
              <CardHeader className="p-0">
                <CardTitle>
                  <Skeleton className="h-5 w-3/4 bg-gray-300/70 rounded" />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col space-y-2 p-0">
                <Skeleton className="h-3 w-5/6 bg-gray-300/50 rounded" />
                <div className="flex items-center justify-between mt-2">
                  <Skeleton className="w-6 h-6 rounded-full bg-gray-300/70" />
                  <Skeleton className="h-3 w-16 bg-gray-300/50 rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

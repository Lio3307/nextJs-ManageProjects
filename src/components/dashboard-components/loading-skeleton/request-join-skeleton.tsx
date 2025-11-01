import { Skeleton } from "@/components/ui/skeleton";

export default function JoinRequestSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 sm:px-8 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <Skeleton className="h-8 w-48" />
          </div>
          <Skeleton className="h-4 w-80" />
          <div className="mt-4 flex gap-4">
            <Skeleton className="h-6 w-36 rounded-full" />
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white border-2 border-gray-200 rounded-lg p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3 flex-shrink-0">
                  <Skeleton className="h-10 w-20 rounded-lg" />
                  <Skeleton className="h-10 w-20 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton"

export default function AddTaskSkeleton() {
  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <div>
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-3 w-52" />
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-2 h-2 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-3 w-64" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Skeleton className="w-2 h-2 rounded-full" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>

            <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
              <div className="p-3 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-12 rounded-md" />
                  ))}
                </div>
              </div>
              <div className="p-4">
                <Skeleton className="h-[200px] w-full rounded-md" />
              </div>
            </div>

            <Skeleton className="h-3 w-72" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
            <Skeleton className="h-10 w-full sm:w-32 rounded-md" />
            <Skeleton className="h-10 w-full sm:w-32 rounded-md" />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <Skeleton className="w-5 h-5 mt-0.5 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-52" />
              <Skeleton className="h-3 w-48" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-start space-x-3">
            <Skeleton className="w-5 h-5 mt-0.5 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-52" />
              <Skeleton className="h-3 w-48" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

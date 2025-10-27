import { Skeleton } from "@/components/ui/skeleton"

export default function ReportListSkeleton() {
  return (
    <div className="space-y-8 p-4">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center space-x-3">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          <div className="flex justify-end">
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>

          <div className="flex items-start space-x-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <Skeleton className="w-5 h-5 rounded" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-2 w-64" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-2 h-2 rounded-full" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-2 h-2 rounded-full" />
              <Skeleton className="h-3 w-28" />
            </div>
            <Skeleton className="h-28 w-full rounded-lg" />
            <Skeleton className="h-2 w-48" />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-3 w-24" />
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-6 h-6 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-2.5 w-20" />
                    <Skeleton className="h-2 w-16" />
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <Skeleton className="h-2.5 w-16 ml-auto" />
                  <Skeleton className="h-2 w-12 ml-auto" />
                </div>
              </div>

              <div className="px-6 py-5 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

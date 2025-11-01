import { Skeleton } from "@/components/ui/skeleton"

export default function ReportDetailSkeleton() {
  return (
    <div className="p-4 space-y-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <Skeleton className="h-5 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>

        <div className="px-6 py-5 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div>
                <Skeleton className="h-3 w-20 mb-2" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div>
                <Skeleton className="h-3 w-20 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>

          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-64" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center space-x-2">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>

        <div className="px-6 py-6 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-10/12" />
          <Skeleton className="h-4 w-9/12" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200 flex items-center space-x-3">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <div>
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-3 w-56" />
          </div>
        </div>

        <div className="px-6 py-6 space-y-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-24 w-full rounded-lg" />
          <div className="flex justify-end">
            <Skeleton className="h-9 w-32 rounded-lg" />
          </div>
        </div>

        <div className="px-6 py-6 space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Skeleton className="w-7 h-7 rounded-full" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-10/12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

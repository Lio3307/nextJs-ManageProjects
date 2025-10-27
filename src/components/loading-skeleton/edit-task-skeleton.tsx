import { Skeleton } from "@/components/ui/skeleton"

export default function EditTaskSkeleton() {
  return (
    <div className="w-full space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-amber-50 border-b border-gray-200 flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        <div className="p-6 space-y-8">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-3 w-3/4" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
              <div className="p-3 border-b border-gray-200 flex flex-wrap gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-14 rounded-md" />
                ))}
              </div>
              <div className="p-4">
                <Skeleton className="h-48 lg:h-64 w-full rounded-lg" />
              </div>
            </div>
            <Skeleton className="h-3 w-1/2" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
            <Skeleton className="h-10 w-full sm:w-auto rounded-lg" />
            <Skeleton className="h-10 w-full sm:w-auto rounded-lg" />
          </div>

          <div className="sm:hidden flex flex-col gap-3 pt-4 border-t border-gray-100">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </div>

      <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-3">
        <Skeleton className="w-6 h-6 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>
    </div>
  )
}

import { Skeleton } from "@/components/ui/skeleton"

export default function EditProjectSkeleton() {
  return (
    <div className="p-4 w-full space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>

        <div className="p-6 space-y-8">
          <div className="md:flex hidden md:flex-row justify-end gap-3">
            <Skeleton className="h-10 w-28 rounded-lg" />
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-3 w-24" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-3 w-1/2" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-36 lg:h-44 w-full rounded-lg" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>

          <div className="sm:hidden flex flex-col gap-3 pt-6 border-t border-gray-200">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 flex items-start gap-3">
        <Skeleton className="w-5 h-5 rounded-full mt-1" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>
    </div>
  )
}

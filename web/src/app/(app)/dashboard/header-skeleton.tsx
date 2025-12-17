import { Skeleton } from '@/components/ui/skeleton'

export function HeaderSkeleton() {
  return (
    <header className="mx-auto flex max-w-300 justify-between gap-4 border-b px-4 py-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-5 w-32" />
      </div>

      <Skeleton className="h-9 w-9 rounded-full" />
    </header>
  )
}

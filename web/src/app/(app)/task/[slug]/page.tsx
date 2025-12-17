import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getCurrentTask } from '@/auth/auth'
import { getTask } from '@/http/get-task'
import { Details } from './details'
import { DetailsSkeleton } from './details-skeleton'

export async function generateMetadata(): Promise<Metadata> {
  const currentTask = await getCurrentTask()
  return {
    title: currentTask!,
  }
}

export default async function TaskDetailPage() {
  const currentTask = await getCurrentTask()
  const { task } = await getTask({ slug: currentTask! })
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Suspense fallback={<DetailsSkeleton />}>
          <Details task={task} />
        </Suspense>
      </div>
    </div>
  )
}

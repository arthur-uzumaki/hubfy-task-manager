import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { HeaderSkeleton } from '@/app/(app)/dashboard/header-skeleton'
import { TaskForm } from '@/app/(app)/task/task-form'
import { getCurrentTask } from '@/auth/auth'
import { Header } from '@/components/header'
import { getTask } from '@/http/get-task'

export const metadata: Metadata = {
  title: 'Update tarefa',
}

export default async function UpdatePager() {
  const currentTask = await getCurrentTask()
  const { task } = await getTask({ slug: currentTask! })

  return (
    <div className="space-y-4 px-4">
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>

      <Link
        href={`/task/${task.slug}`}
        className="mb-6 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para tarefa
      </Link>

      <div className="mb-8">
        <h1 className="font-bold text-3xl text-foreground tracking-tight">
          Atualiza Task
        </h1>
      </div>
      <TaskForm
        isUpdating
        initialDate={{
          title: task.title,
          description: task.description,
          status: task.status,
        }}
      />
    </div>
  )
}

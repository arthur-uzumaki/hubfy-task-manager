import { Plus } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { Header } from '@/components/header'
import { TasksList } from '@/components/tasks-list'
import { Button } from '@/components/ui/button'
import { HeaderSkeleton } from './header-skeleton'
import { TasksListSkeleton } from './tasks-list-skeleton'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>

      <div className="item flex justify-between px-4">
        <div className="mb-8">
          <h1 className="font-bold text-3xl text-foreground tracking-tight">
            Minhas Tasks
          </h1>
          <p className="mt-2 w-2/3 text-muted-foreground md:w-full">
            Gerencie e acompanhe todas as suas tarefas
          </p>
        </div>
        <Button variant={'outline'} asChild>
          <Link href={'/create-task'}>
            <Plus className="size-4" />
            Criar tarefa
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 px-4 pb-4 md:grid-cols-4">
        <Suspense fallback={<TasksListSkeleton />}>
          <TasksList />
        </Suspense>
      </div>
    </div>
  )
}

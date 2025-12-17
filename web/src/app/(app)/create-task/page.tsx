import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { TaskForm } from '@/app/(app)/task/task-form'
import { Header } from '@/components/header'
import { HeaderSkeleton } from '../dashboard/header-skeleton'

export const metadata: Metadata = {
  title: 'Criar Tarefa',
}

export default function CreatePager() {
  return (
    <div className="space-y-4 px-4">
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>

      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para dashboard
      </Link>

      <div className="mb-8">
        <h1 className="font-bold text-3xl text-foreground tracking-tight">
          Nova Task
        </h1>
        <p className="mt-2 text-muted-foreground">
          Crie uma nova task para organizar seu trabalho
        </p>
      </div>
      <TaskForm />
    </div>
  )
}

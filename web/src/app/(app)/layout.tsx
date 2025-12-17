import { redirect } from 'next/navigation'
import type React from 'react'
import { Suspense } from 'react'
import { isAuthenticate } from '@/auth/auth'

export default async function AppLayout({
  children,
  sheet,
}: {
  children: React.ReactNode
  sheet: React.ReactNode
}) {
  if (!isAuthenticate()) {
    redirect('/auth/login')
  }

  return (
    <Suspense fallback={null}>
      <div className="pt-16">
        <main className="mx-auto w-full max-w-300 space-y-4">
          {children} {sheet}
        </main>
        {sheet}
      </div>
    </Suspense>
  )
}

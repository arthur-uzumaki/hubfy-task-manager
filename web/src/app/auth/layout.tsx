import { Suspense } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import AuthRedirect from './auth-redirect'

export default async function LayoutAuth({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Suspense fallback={null}>
        <AuthRedirect>
          <Card className="w-full max-w-sm">
            <CardContent>{children}</CardContent>
          </Card>
        </AuthRedirect>
      </Suspense>
    </div>
  )
}

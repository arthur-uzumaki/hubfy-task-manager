import { AlertCircle, ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-destructive/10 blur-xl" />
            <div className="relative rounded-full border border-border bg-card p-6">
              <AlertCircle className="h-16 w-16 text-destructive" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="font-bold text-7xl text-foreground">404</h1>
          <h2 className="font-semibold text-2xl text-foreground">
            Página não encontrada
          </h2>
          <p className="text-pretty text-muted-foreground leading-relaxed">
            A página que você está procurando não existe ou foi movida para
            outro lugar.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="default" className="gap-2">
            <Link href="/">
              <Home className="size-4" />
              Voltar ao início
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2 bg-transparent">
            <Link href={'/'}>
              <ArrowLeft className="size-4" />
              Voltar
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

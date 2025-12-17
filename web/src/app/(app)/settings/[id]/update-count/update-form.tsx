'use client'
import { AlertTriangle, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { userFormState } from '@/hooks/use-form-state'
import { updateCountAction } from './action'

interface UpdateFormProps {
  initialDate?: {
    name: string
    email: string
  }
}

export function UpdateForm({ initialDate }: UpdateFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [{ errors, message, success }, formAction, isPending] =
    userFormState(updateCountAction)

  return (
    <form className="space-y-6" action={formAction}>
      {success === false && message && (
        <Alert variant={'destructive'}>
          <AlertTriangle className="size-4" />
          <AlertTitle>Update falhou</AlertTitle>
          <AlertDescription>
            <span>{message}</span>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground">
          Nome completo
        </Label>
        <Input
          id="name"
          name="name"
          defaultValue={initialDate?.name}
          required
        />
        {errors?.name && (
          <span className="font-medium text-red-400 text-xs dark:text-red-500">
            {errors.name[0]}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={initialDate?.email}
          required
        />
        {errors?.email && (
          <span className="font-medium text-red-400 text-xs dark:text-red-500">
            {errors.email[0]}
          </span>
        )}
      </div>

      <div className="border-border border-t pt-6">
        <h3 className="mb-4 font-medium text-sm">Alterar Senha (Opcional)</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Nova Senha</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Deixe em branco para manter a atual"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="-translate-y-1/2 absolute top-1/2 right-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors?.password && (
              <span className="font-medium text-red-400 text-xs dark:text-red-500">
                {errors.password[0]}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password_confirmation">Confirmar Nova Senha</Label>
            <div className="relative">
              <Input
                id="password_confirmation"
                name="password_confirmation"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirme a nova senha"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(prev => !prev)}
                className="-translate-y-1/2 absolute top-1/2 right-3 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors?.password_confirmation && (
              <span className="font-medium text-red-400 text-xs dark:text-red-500">
                {errors.password_confirmation[0]}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 border-border border-t pt-6">
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Salvando...
            </>
          ) : (
            'Salvar Alterações'
          )}
        </Button>
      </div>
    </form>
  )
}

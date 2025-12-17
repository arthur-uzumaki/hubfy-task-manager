'use client'

import { AlertTriangle, Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { userFormState } from '@/hooks/use-form-state'
import { registerAction } from './action'
export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [{ errors, message, success }, formAction, isPending] =
    userFormState(registerAction)
  return (
    <form className="space-y-3" action={formAction}>
      {success === false && message && (
        <Alert variant={'destructive'}>
          <AlertTriangle className="size-4" />
          <AlertTitle>Login falhou </AlertTitle>
          <AlertDescription>
            <span>{message}</span>
          </AlertDescription>
        </Alert>
      )}
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Nome</FieldLabel>
          <Input id="name" name="name" type="name" placeholder="Jonh Doe" />
          {errors?.name && (
            <span className="font-medium text-red-400 text-xs dark:text-red-500">
              {errors.name[0]}
            </span>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Jonhdoe@gmail.com"
          />
          {errors?.email && (
            <span className="font-medium text-red-400 text-xs dark:text-red-500">
              {errors.email[0]}
            </span>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              className="pr-10"
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
        </Field>

        <Field>
          <FieldLabel htmlFor="password_confirmation">
            Confirmação de senha
          </FieldLabel>
          <div className="relative">
            <Input
              id="password_confirmation"
              name="password_confirmation"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="********"
              className="pr-10"
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
        </Field>
        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              'Criar conta'
            )}
          </Button>
          <FieldDescription className="text-center">
            <span className="text-muted-foreground">
              <Link className="hover:underline" href={'/auth/login'}>
                Já possui conta? acessa aqui
              </Link>
            </span>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}

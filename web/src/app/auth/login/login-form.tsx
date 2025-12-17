'use client'
import { AlertTriangle, Loader2 } from 'lucide-react'
import Link from 'next/link'
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
import { loginAction } from './action'

export function LoginForm() {
  const [{ errors, message, success }, formAction, isPending] =
    userFormState(loginAction)

  return (
    <form action={formAction}>
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
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
          />
          {errors?.email && (
            <span className="font-medium text-red-400 text-xs dark:text-red-500">
              {errors.email[0]}
            </span>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="*****"
          />
          {errors?.password && (
            <span className="font-medium text-red-400 text-xs dark:text-red-500">
              {errors.password[0]}
            </span>
          )}
        </Field>

        <Field>
          <Button type="submit">
            {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Login'}
          </Button>

          <FieldDescription className="text-center">
            <span className="hover:underline">
              <Link href={'/auth/register'}>Não tenho uma conta?</Link>
            </span>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}

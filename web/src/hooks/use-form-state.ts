import { useActionState } from 'react'

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export function userFormState(
  action: (_: unknown, data: FormData) => Promise<FormState>,
  initialState?: FormState
) {
  const [formState, formAction, isPending] = useActionState(
    action,
    initialState ?? { success: true, message: null, errors: null }
  )

  return [formState, formAction, isPending] as const
}

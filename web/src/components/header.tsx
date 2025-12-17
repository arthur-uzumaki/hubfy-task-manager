import { auth } from '@/auth/auth'
import { ProfileButton } from './profile-button'

export async function Header() {
  const { user } = await auth()

  // src/components/header-skeleton.tsx

  return (
    <header className="mx-auto flex max-w-300 justify-between gap-4 space-y-2 border-b px-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-2xl text-card-foreground">
          Seja bem vindo
        </h2>
        <span className="text-lg text-muted-foreground">{user.name}</span>
      </div>

      <div>
        <ProfileButton />
      </div>
    </header>
  )
}

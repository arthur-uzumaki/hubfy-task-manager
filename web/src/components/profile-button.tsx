import { LogOut, Settings, User } from 'lucide-react'
import { auth } from '@/auth/auth'
import { Avatar, AvatarFallback } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export async function ProfileButton() {
  const { user } = await auth()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-10">
          <AvatarFallback>
            <User className="size-4 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <a href={`/settings/${user.id}`}>
            <Settings className="mr-3 size-3" />
            Settings
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a href="/api/auth/sign-out">
            <LogOut className="mr-3 size-3" />
            Sair
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

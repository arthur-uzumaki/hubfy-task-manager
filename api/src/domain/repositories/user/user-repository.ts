import type { User } from '../../entities/user.ts'

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>
  abstract create(user: User): Promise<{ id: string }>
  abstract findById(id: string): Promise<User | null>
  abstract save(user: User): Promise<void>
  abstract delete(id: string): Promise<void>
}

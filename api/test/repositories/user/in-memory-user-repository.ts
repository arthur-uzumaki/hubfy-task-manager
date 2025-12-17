import type { User } from '../../../src/domain/entities/user.ts'
import type { UserRepository } from '../../../src/domain/repositories/user/user-repository.ts'

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email)

    if (!user) {
      return null
    }
    return user
  }

  async create(user: User): Promise<{ id: string }> {
    this.users.push(user)
    return { id: user.id.toString() }
  }
  async findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id.toString() === id)

    if (!user) {
      return null
    }
    return user
  }
  async save(user: User): Promise<void> {
    const userIndex = this.users.findIndex(
      u => u.id.toString() === user.id.toString()
    )
    if (userIndex !== -1) {
      this.users[userIndex] = user
    }
  }
  async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id.toString() === id)
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1)
    }
  }
}

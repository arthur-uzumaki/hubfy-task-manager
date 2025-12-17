import { eq } from 'drizzle-orm'
import type { User } from '../../../../domain/entities/user.ts'
import type { UserRepository } from '../../../../domain/repositories/user/user-repository.ts'
import { db } from '../../connection.ts'
import { UserMapper } from '../../mappers/mapper-user.ts'
import { schema } from '../../schema/index.ts'

export class UserRepositoryDrizzle implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const result = await db
      .select({
        id: schema.user.id,
        name: schema.user.name,
        email: schema.user.email,
        password: schema.user.password,
        createdAt: schema.user.createdAt,
      })
      .from(schema.user)
      .where(eq(schema.user.email, email))

    if (result.length === 0) {
      return null
    }

    const user = UserMapper.toDomain(result[0])

    return user
  }

  async create(user: User): Promise<{ id: string }> {
    const raw = UserMapper.toPersistence(user)

    await db.insert(schema.user).values(raw)
    return { id: raw.id }
  }

  async findById(id: string): Promise<User | null> {
    const result = await db
      .select({
        id: schema.user.id,
        name: schema.user.name,
        email: schema.user.email,
        password: schema.user.password,
        createdAt: schema.user.createdAt,
      })
      .from(schema.user)
      .where(eq(schema.user.id, id))

    if (result.length === 0) {
      return null
    }

    const user = UserMapper.toDomain(result[0])

    return user
  }
  async save(user: User): Promise<void> {
    const raw = UserMapper.toPersistence(user)

    const { id, ...dataToUpdate } = raw

    await db.update(schema.user).set(dataToUpdate).where(eq(schema.user.id, id))
  }

  async delete(id: string): Promise<void> {
    await db.delete(schema.user).where(eq(schema.user.id, id))
  }
}

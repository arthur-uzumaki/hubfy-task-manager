import type { InferSelectModel } from 'drizzle-orm'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id.ts'
import { User } from '../../../domain/entities/user.ts'
import type { schema } from '../schema/index.ts'

type UserRaw = InferSelectModel<typeof schema.user>

// biome-ignore lint/complexity/noStaticOnlyClass: <Não precisa ser instanciado>
export class UserMapper {
  static toDomain(raw: UserRaw): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id)
    )
  }

  static toPersistence(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
    }
  }
}

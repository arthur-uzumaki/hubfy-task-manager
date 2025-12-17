import { faker } from '@faker-js/faker'
import type { UniqueEntityId } from '../../src/core/entities/unique-entity-id.ts'
import { User, type UserProps } from '../../src/domain/entities/user.ts'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityId
) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id
  )

  return user
}

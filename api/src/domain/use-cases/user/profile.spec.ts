import { beforeEach, describe, expect, it } from 'vitest'
import { makeUser } from '../../../../test/factories/make-user.ts'
import { InMemoryUserRepository } from '../../../../test/repositories/user/in-memory-user-repository.ts'
import { UnauthorizedError } from '../_erros/unauthorized-error.ts'
import { ProfileUseCase } from './profile.ts'

describe('Profile', () => {
  let inMemoryUser: InMemoryUserRepository

  beforeEach(() => {
    inMemoryUser = new InMemoryUserRepository()
  })

  it('should be able get profile user', async () => {
    const profile = new ProfileUseCase(inMemoryUser)

    const user = makeUser()

    inMemoryUser.users.push(user)

    const result = await profile.execute({
      userId: user.id.toString(),
    })

    expect(result).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          name: expect.any(String),
          email: expect.any(String),
          password: expect.any(String),
        }),
      })
    )
  })

  it('should be not get profile user not unauthorized', async () => {
    const profile = new ProfileUseCase(inMemoryUser)

    const user = makeUser()

    inMemoryUser.users.push(user)

    await expect(() => {
      return profile.execute({
        userId: '1625ad55-8738-4933-accc-da3a9e9bc0f6',
      })
    }).rejects.toThrow(UnauthorizedError)

    await expect(() => {
      return profile.execute({
        userId: '1625ad55-8738-4933-accc-da3a9e9bc0f6',
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: 'Unauthorized',
      })
    )
  })
})

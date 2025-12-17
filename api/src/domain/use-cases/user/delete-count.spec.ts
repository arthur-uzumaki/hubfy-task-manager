import { beforeEach, describe, expect, it } from 'vitest'
import { makeUser } from '../../../../test/factories/make-user.ts'
import { InMemoryUserRepository } from '../../../../test/repositories/user/in-memory-user-repository.ts'
import { UnauthorizedError } from '../_erros/unauthorized-error.ts'
import { DeleteCountUseCase } from './delete-count.ts'

describe('Delete count', () => {
  let inMemoryUser: InMemoryUserRepository

  beforeEach(() => {
    inMemoryUser = new InMemoryUserRepository()
  })

  it('should be able dele count  user', async () => {
    const deleteCount = new DeleteCountUseCase(inMemoryUser)

    const user = makeUser()

    inMemoryUser.users.push(user)
    await deleteCount.execute({
      userId: user.id.toString(),
    })
    expect(inMemoryUser.users.length).toBe(0)
  })

  it('should be not delete count  user not unauthorized', async () => {
    const deleteCount = new DeleteCountUseCase(inMemoryUser)

    const user = makeUser()

    inMemoryUser.users.push(user)
    await expect(() => {
      return deleteCount.execute({
        userId: '1625ad55-8738-4933-accc-da3a9e9bc0f6',
      })
    }).rejects.toThrow(UnauthorizedError)

    await expect(() => {
      return deleteCount.execute({
        userId: '1625ad55-8738-4933-accc-da3a9e9bc0f6',
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: 'Unauthorized',
      })
    )
  })
})

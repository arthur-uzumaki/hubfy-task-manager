import { beforeEach, describe, expect, it } from 'vitest'
import { FakeHash } from '../../../../test/cryptography/fake-hash.ts'
import { makeUser } from '../../../../test/factories/make-user.ts'
import { InMemoryUserRepository } from '../../../../test/repositories/user/in-memory-user-repository.ts'
import { UnauthorizedError } from '../_erros/unauthorized-error.ts'
import { UpdateCountUseCase } from './update-count.ts'

describe('Update count', () => {
  let inMemoryUser: InMemoryUserRepository
  let fakeHasher: FakeHash

  beforeEach(() => {
    inMemoryUser = new InMemoryUserRepository()
    fakeHasher = new FakeHash()
  })

  it('should be able update count  user', async () => {
    const updateCount = new UpdateCountUseCase(inMemoryUser, fakeHasher)

    const user = makeUser()

    inMemoryUser.users.push(user)
    await updateCount.execute({
      userId: user.id.toString(),
      name: 'Lucas T',
      email: 'lucast@gmail.com',
      password: '1234567',
    })
    expect(inMemoryUser.users[0].name).toBe('Lucas T')
    expect(inMemoryUser.users[0].email).toBe('lucast@gmail.com')
    expect(inMemoryUser.users[0].password).toBe('1234567-hashed')
  })
  it('should be not delete count  user not unauthorized', async () => {
    const updateCount = new UpdateCountUseCase(inMemoryUser, fakeHasher)

    const user = makeUser()

    inMemoryUser.users.push(user)
    await expect(
      updateCount.execute({
        userId: '1625ad55-8738-4933-accc-da3a9e9bc0f6',
        name: 'Lucas T',
        email: 'lucast@gmail.com',
        password: '1234567',
      })
    ).rejects.toThrow(UnauthorizedError)
    await expect(
      updateCount.execute({
        userId: '1625ad55-8738-4933-accc-da3a9e9bc0f6',
        name: 'Lucas T',
        email: 'lucast@gmail.com',
        password: '1234567',
      })
    ).rejects.toThrow(UnauthorizedError)
  })
})

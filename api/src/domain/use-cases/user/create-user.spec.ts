import { beforeEach, describe, expect, it } from 'vitest'
import { FakeHash } from '../../../../test/cryptography/fake-hash.ts'
import { InMemoryUserRepository } from '../../../../test/repositories/user/in-memory-user-repository.ts'
import { BadRequestError } from '../_erros/bad-request.ts'
import { CreateUserUseCase } from './create-user.ts'

describe('registe user', () => {
  let inMemoryUserRepository: InMemoryUserRepository
  let fakeHasher: FakeHash

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeHasher = new FakeHash()
  })

  it('should be able to register a user', async () => {
    const registerUser = new CreateUserUseCase(
      inMemoryUserRepository,
      fakeHasher
    )

    const user = await registerUser.execute({
      name: 'Arthur Sousa',
      email: 'arthur@gmail.com',
      password: '123456',
    })

    expect(user).toBeTruthy()
    expect(inMemoryUserRepository.users[0].id.toString()).toEqual(user.userId)
  })

  it('should not be able register with email unique', async () => {
    const registerUser = new CreateUserUseCase(
      inMemoryUserRepository,
      fakeHasher
    )

    await registerUser.execute({
      name: 'Arthur Sousa',
      email: 'arthur@gmail.com',
      password: '123456',
    })

    await expect(() => {
      return registerUser.execute({
        name: 'Arthur Sousa',
        email: 'arthur@gmail.com',
        password: '123456',
      })
    }).rejects.toThrow(BadRequestError)
  })
})

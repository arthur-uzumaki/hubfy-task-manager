import { beforeEach, describe, expect, it } from 'vitest'
import { FakeEncrypter } from '../../../../test/cryptography/fake-encrypter.ts'
import { FakeHash } from '../../../../test/cryptography/fake-hash.ts'
import { makeUser } from '../../../../test/factories/make-user.ts'
import { InMemoryUserRepository } from '../../../../test/repositories/user/in-memory-user-repository.ts'
import { BadRequestError } from '../_erros/bad-request.ts'
import { AuthenticateUseCase } from './authenticate.ts'

describe('Authenticate User', () => {
  let inMemoryUserRepository: InMemoryUserRepository
  let fakeHasher: FakeHash
  let fakeEncrypter: FakeEncrypter

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeHasher = new FakeHash()
    fakeEncrypter = new FakeEncrypter()
  })

  it('should be able authenticate user ', async () => {
    const authenticate = new AuthenticateUseCase(
      inMemoryUserRepository,
      fakeHasher,
      fakeEncrypter
    )

    const user = makeUser({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryUserRepository.users.push(user)

    const result = await authenticate.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result).toEqual({
      accessToken: expect.any(String),
    })
  })
  it('should be not able authenticate email credential not valid', async () => {
    const authenticate = new AuthenticateUseCase(
      inMemoryUserRepository,
      fakeHasher,
      fakeEncrypter
    )

    const user = makeUser({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryUserRepository.users.push(user)

    await expect(() => {
      return authenticate.execute({
        email: 'SDSDS@gmail.com',
        password: '123456',
      })
    }).rejects.toThrow(BadRequestError)
  })

  it('should be not able authenticate password credential not valid', async () => {
    const authenticate = new AuthenticateUseCase(
      inMemoryUserRepository,
      fakeHasher,
      fakeEncrypter
    )

    const user = makeUser({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryUserRepository.users.push(user)

    await expect(() => {
      return authenticate.execute({
        email: 'johndoe@example.com',
        password: '123456789',
      })
    }).rejects.toThrow(BadRequestError)
  })
})

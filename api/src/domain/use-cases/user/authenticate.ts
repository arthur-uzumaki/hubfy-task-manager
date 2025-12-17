import type { Encrypter } from '../../cryptography/encrypter.ts'
import type { HashComparer } from '../../cryptography/hash-comparer.ts'
import type { UserRepository } from '../../repositories/user/user-repository.ts'
import { BadRequestError } from '../_erros/bad-request.ts'

type AuthenticateUseCaseRequest = {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = {
  accessToken: string
}

export class AuthenticateUseCase {
  private readonly userRepository: UserRepository
  private readonly hashedComparer: HashComparer
  private readonly encrypter: Encrypter

  constructor(
    userRepository: UserRepository,
    hashedComparer: HashComparer,
    encrypter: Encrypter
  ) {
    this.userRepository = userRepository
    this.hashedComparer = hashedComparer
    this.encrypter = encrypter
  }
  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new BadRequestError('Credentials are not valid.')
    }

    const isPasswordValid = await this.hashedComparer.compare(
      password,
      user.password
    )

    if (!isPasswordValid) {
      throw new BadRequestError('Credentials are not valid.')
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    })

    return { accessToken }
  }
}

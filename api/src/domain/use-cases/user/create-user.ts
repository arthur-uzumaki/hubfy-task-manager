import type { HashGenerator } from '../../cryptography/hash-generator.ts'
import { User } from '../../entities/user.ts'
import type { UserRepository } from '../../repositories/user/user-repository.ts'
import { BadRequestError } from '../_erros/bad-request.ts'

type CreateUserUseCaseRequest = {
  name: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = {
  userId: string
}

export class CreateUserUseCase {
  private readonly userRepository: UserRepository
  private readonly hashGenerator: HashGenerator

  constructor(userRepository: UserRepository, hashGenerator: HashGenerator) {
    this.userRepository = userRepository
    this.hashGenerator = hashGenerator
  }

  async execute({
    email,
    name,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (user) {
      throw new BadRequestError('Email already in use')
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const newUser = User.create({
      name,
      email,
      password: hashedPassword,
    })

    const createdUser = await this.userRepository.create(newUser)

    return {
      userId: createdUser.id,
    }
  }
}

import type { HashGenerator } from '../../cryptography/hash-generator.ts'
import type { UserRepository } from '../../repositories/user/user-repository.ts'
import { UnauthorizedError } from '../_erros/unauthorized-error.ts'

type UpdateCountUseCaseRequest = {
  userId: string
  name: string
  email: string
  password: string
}

// biome-ignore lint/suspicious/noConfusingVoidType: <Não precisa de retorno>
type UpdateCountUseCaseResponse = void

export class UpdateCountUseCase {
  private readonly userRepository: UserRepository
  private readonly hashGenerator: HashGenerator
  constructor(userRepository: UserRepository, hashGenerator: HashGenerator) {
    this.userRepository = userRepository
    this.hashGenerator = hashGenerator
  }
  async execute({
    userId,
    email,
    name,
    password,
  }: UpdateCountUseCaseRequest): Promise<UpdateCountUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UnauthorizedError()
    }
    const hashedPassword = await this.hashGenerator.hash(password)

    user.name = name
    user.email = email
    user.password = hashedPassword

    await this.userRepository.save(user)
  }
}

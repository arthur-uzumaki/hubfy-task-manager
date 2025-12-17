import type { UserRepository } from '../../repositories/user/user-repository.ts'
import { UnauthorizedError } from '../_erros/unauthorized-error.ts'

type DeleteCountUseCaseRequest = {
  userId: string
}

// biome-ignore lint/suspicious/noConfusingVoidType: <Não precisa de retorno>
type DeleteCountUseCaseResponse = void

export class DeleteCountUseCase {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async execute({
    userId,
  }: DeleteCountUseCaseRequest): Promise<DeleteCountUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UnauthorizedError()
    }

    await this.userRepository.delete(user.id.toString())
  }
}

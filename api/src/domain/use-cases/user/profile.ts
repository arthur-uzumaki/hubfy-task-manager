import type { User } from '../../entities/user.ts'
import type { UserRepository } from '../../repositories/user/user-repository.ts'
import { UnauthorizedError } from '../_erros/unauthorized-error.ts'

type ProfileUseCaseRequest = {
  userId: string
}

type ProfileUseCaseResponse = {
  user: User
}

export class ProfileUseCase {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async execute({
    userId,
  }: ProfileUseCaseRequest): Promise<ProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UnauthorizedError()
    }

    return { user }
  }
}

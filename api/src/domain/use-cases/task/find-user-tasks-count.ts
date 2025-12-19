import type { TaskRepository } from '../../repositories/task/task-repository.ts'
import type { UserRepository } from '../../repositories/user/user-repository.ts'
import { UnauthorizedError } from '../_erros/unauthorized-error.ts'

type FindUserTasksCountUseCaseRequest = {
  userId: string
}

type FindUserTasksCountUseCaseResponse = {
  count: number
}

export class FindUserTasksCountUseCase {
  private readonly userRepository: UserRepository
  private readonly taskRepository: TaskRepository

  constructor(userRepository: UserRepository, taskRepository: TaskRepository) {
    this.userRepository = userRepository
    this.taskRepository = taskRepository
  }
  async execute({
    userId,
  }: FindUserTasksCountUseCaseRequest): Promise<FindUserTasksCountUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UnauthorizedError()
    }

    const count = await this.taskRepository.countByUserId(userId)

    return {
      count,
    }
  }
}

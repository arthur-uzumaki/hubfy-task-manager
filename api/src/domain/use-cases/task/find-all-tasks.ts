import type { Task } from '../../entities/task.ts'
import type { TaskRepository } from '../../repositories/task/task-repository.ts'
import type { UserRepository } from '../../repositories/user/user-repository.ts'
import { UnauthorizedError } from '../_erros/unauthorized-error.ts'

type FindAllTasksUseCaseRequest = {
  userId: string
}

type FindAllTasksUseCaseResponse = {
  tasks: Task[]
}

export class FindAllTasksUseCase {
  private readonly userRepository: UserRepository
  private readonly taskRepository: TaskRepository

  constructor(userRepository: UserRepository, taskRepository: TaskRepository) {
    this.userRepository = userRepository
    this.taskRepository = taskRepository
  }
  async execute({
    userId,
  }: FindAllTasksUseCaseRequest): Promise<FindAllTasksUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UnauthorizedError()
    }

    const tasks = await this.taskRepository.findMany(userId)

    return {
      tasks,
    }
  }
}

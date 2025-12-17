import type { Task } from '../../entities/task.ts'
import type { TaskRepository } from '../../repositories/task/task-repository.ts'
import type { UserRepository } from '../../repositories/user/user-repository.ts'
import { NotFoundError } from '../_erros/not-found.ts'
import { UnauthorizedError } from '../_erros/unauthorized-error.ts'

type FindTaskRequest = {
  userId: string
  slug: string
}

type FindTaskResponse = {
  task: Task
}

export class FindTaskUseCase {
  private readonly userRepository: UserRepository
  private readonly taskRepository: TaskRepository

  constructor(userRepository: UserRepository, taskRepository: TaskRepository) {
    this.userRepository = userRepository
    this.taskRepository = taskRepository
  }
  async execute({ userId, slug }: FindTaskRequest): Promise<FindTaskResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UnauthorizedError()
    }

    const task = await this.taskRepository.findBySlug(slug)

    if (!task) {
      throw new NotFoundError('Task not found.')
    }
    if (task.userId !== userId) {
      throw new UnauthorizedError()
    }

    return {
      task,
    }
  }
}

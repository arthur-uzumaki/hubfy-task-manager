import type { TaskRepository } from '../../repositories/task/task-repository.ts'
import type { UserRepository } from '../../repositories/user/user-repository.ts'
import { NotFoundError } from '../_erros/not-found.ts'
import { UnauthorizedError } from '../_erros/unauthorized-error.ts'

type DeleteTaskRequest = {
  userId: string
  slug: string
}

// biome-ignore lint/suspicious/noConfusingVoidType: <Não precisa de retorno>
type DeleteTaskResponse = void

export class DeleteTaskUseCase {
  private readonly userRepository: UserRepository
  private readonly taskRepository: TaskRepository

  constructor(userRepository: UserRepository, taskRepository: TaskRepository) {
    this.userRepository = userRepository
    this.taskRepository = taskRepository
  }
  async execute({
    userId,
    slug,
  }: DeleteTaskRequest): Promise<DeleteTaskResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UnauthorizedError()
    }

    const deleted = await this.taskRepository.delete(slug, userId)

    if (!deleted) {
      throw new NotFoundError('Task not found.')
    }
  }
}

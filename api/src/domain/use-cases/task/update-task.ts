import type { TaskRepository } from '../../repositories/task/task-repository.ts'
import type { UserRepository } from '../../repositories/user/user-repository.ts'
import { NotFoundError } from '../_erros/not-found.ts'
import { UnauthorizedError } from '../_erros/unauthorized-error.ts'

type UpdateTaskTaskRequest = {
  userId: string
  slug: string
  title: string
  description?: string
  status: 'pending' | 'in_progress' | 'completed'
}

// biome-ignore lint/suspicious/noConfusingVoidType: <Não precisa de retorno>
type UpdateTaskTaskResponse = void

export class UpdateTaskTaskUseCase {
  private readonly userRepository: UserRepository
  private readonly taskRepository: TaskRepository

  constructor(userRepository: UserRepository, taskRepository: TaskRepository) {
    this.userRepository = userRepository
    this.taskRepository = taskRepository
  }
  async execute({
    userId,
    slug,
    status,
    title,
    description,
  }: UpdateTaskTaskRequest): Promise<UpdateTaskTaskResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UnauthorizedError()
    }

    const task = await this.taskRepository.findBySlug(slug)

    if (!task) {
      throw new NotFoundError('Task not found.')
    }

    task.title = title
    task.description = description
    task.status = status

    await this.taskRepository.save(task)
  }
}

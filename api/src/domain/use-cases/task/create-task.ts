import { Task } from '../../entities/task.ts'
import { Slug } from '../../entities/value-object/slug.ts'
import type { TaskRepository } from '../../repositories/task/task-repository.ts'
import type { UserRepository } from '../../repositories/user/user-repository.ts'
import { UnauthorizedError } from '../_erros/unauthorized-error.ts'

type CreateTaskUseCaseRequest = {
  userId: string
  title: string
  description?: string
  status: 'pending' | 'in_progress' | 'completed'
}

type CreateTaskUseCaseResponse = {
  taskId: string
}

export class CreateTaskUseCase {
  private readonly userRepository: UserRepository
  private readonly taskRepository: TaskRepository

  constructor(userRepository: UserRepository, taskRepository: TaskRepository) {
    this.userRepository = userRepository
    this.taskRepository = taskRepository
  }

  async execute({
    status,
    title,
    userId,
    description,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UnauthorizedError()
    }

    const task = Task.create({
      userId,
      title,
      description,
      slug: Slug.createFromText(title),
      status,
    })

    await this.taskRepository.create(task)

    return {
      taskId: task.id.toString(),
    }
  }
}

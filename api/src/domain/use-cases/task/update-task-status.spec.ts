import { beforeEach, describe, expect, it } from 'vitest'
import { makeTask } from '../../../../test/factories/make-task.ts'
import { makeUser } from '../../../../test/factories/make-user.ts'
import { InMemoryTaskRepository } from '../../../../test/repositories/task/in-memory-task-repository.ts'
import { InMemoryUserRepository } from '../../../../test/repositories/user/in-memory-user-repository.ts'
import { NotFoundError } from '../_erros/not-found.ts'
import { UnauthorizedError } from '../_erros/unauthorized-error.ts'
import { UpdateTaskStatusUseCase } from './update-task-status.ts'

describe('Update task status', () => {
  let inMemoryUserRepository: InMemoryUserRepository
  let inMemoryTaskRepository: InMemoryTaskRepository

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryTaskRepository = new InMemoryTaskRepository()
  })

  it('should be able update task status', async () => {
    const user = makeUser()

    inMemoryUserRepository.users.push(user)

    const task1 = makeTask({
      userId: user.id.toString(),
    })

    inMemoryTaskRepository.create(task1)

    const updateTaskStatus = new UpdateTaskStatusUseCase(
      inMemoryUserRepository,
      inMemoryTaskRepository
    )

    await updateTaskStatus.execute({
      userId: user.id.toString(),
      slug: task1.slug.value,
      status: 'completed',
    })

    expect(inMemoryTaskRepository.tasks[0].status).toBe('completed')
  })

  it('should be not update task status  user not unauthorized', async () => {
    const user = makeUser()

    inMemoryUserRepository.users.push(user)

    const task1 = makeTask({
      userId: user.id.toString(),
    })

    inMemoryTaskRepository.create(task1)

    const updateTaskStatus = new UpdateTaskStatusUseCase(
      inMemoryUserRepository,
      inMemoryTaskRepository
    )

    inMemoryTaskRepository.create(task1)
    await expect(
      updateTaskStatus.execute({
        userId: '1',
        slug: task1.slug.value,
        status: 'completed',
      })
    ).rejects.toThrow(UnauthorizedError)
  })

  it('should be not update task  not found', async () => {
    const user = makeUser()

    inMemoryUserRepository.users.push(user)

    const task1 = makeTask({
      userId: user.id.toString(),
    })

    inMemoryTaskRepository.create(task1)

    const updateTaskStatus = new UpdateTaskStatusUseCase(
      inMemoryUserRepository,
      inMemoryTaskRepository
    )

    await expect(
      updateTaskStatus.execute({
        userId: user.id.toString(),
        slug: 'fddfds',
        status: 'completed',
      })
    ).rejects.toThrow(NotFoundError)
  })
  it('should not update task status if task does not belong to user', async () => {
    const user = makeUser()
    const otherUser = makeUser()

    inMemoryUserRepository.users.push(user, otherUser)

    const task = makeTask({
      userId: otherUser.id.toString(),
    })

    inMemoryTaskRepository.create(task)

    const updateTaskStatus = new UpdateTaskStatusUseCase(
      inMemoryUserRepository,
      inMemoryTaskRepository
    )

    await expect(
      updateTaskStatus.execute({
        userId: user.id.toString(),
        slug: task.slug.value,
        status: 'completed',
      })
    ).rejects.toThrow(UnauthorizedError)
  })
})

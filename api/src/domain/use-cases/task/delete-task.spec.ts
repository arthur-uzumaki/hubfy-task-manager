import { beforeEach, describe, expect, it } from 'vitest'
import { makeTask } from '../../../../test/factories/make-task.ts'
import { makeUser } from '../../../../test/factories/make-user.ts'
import { InMemoryTaskRepository } from '../../../../test/repositories/task/in-memory-task-repository.ts'
import { InMemoryUserRepository } from '../../../../test/repositories/user/in-memory-user-repository.ts'
import { NotFoundError } from '../_erros/not-found.ts'
import { UnauthorizedError } from '../_erros/unauthorized-error.ts'
import { DeleteTaskUseCase } from './delete-task.ts'

describe('Delete  task', () => {
  let inMemoryUserRepository: InMemoryUserRepository
  let inMemoryTaskRepository: InMemoryTaskRepository

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryTaskRepository = new InMemoryTaskRepository()
  })

  it('should be able delete task', async () => {
    const user = makeUser()

    inMemoryUserRepository.users.push(user)

    const task1 = makeTask({
      userId: user.id.toString(),
    })
    const task2 = makeTask({
      userId: user.id.toString(),
    })
    const task3 = makeTask({
      userId: user.id.toString(),
    })
    const task4 = makeTask({
      userId: user.id.toString(),
    })
    const task5 = makeTask({
      userId: user.id.toString(),
    })

    inMemoryTaskRepository.create(task1)
    inMemoryTaskRepository.create(task2)
    inMemoryTaskRepository.create(task3)
    inMemoryTaskRepository.create(task4)
    inMemoryTaskRepository.create(task5)

    const deleteTask = new DeleteTaskUseCase(
      inMemoryUserRepository,
      inMemoryTaskRepository
    )

    await deleteTask.execute({
      userId: user.id.toString(),
      slug: task1.slug.value,
    })

    expect(inMemoryTaskRepository.tasks).toHaveLength(4)
  })
  it('should be not delete task  user not unauthorized', async () => {
    const deleteTask = new DeleteTaskUseCase(
      inMemoryUserRepository,
      inMemoryTaskRepository
    )
    await expect(
      deleteTask.execute({
        slug: 'title',
        userId: 'sdsfdfds',
      })
    ).rejects.toThrow(UnauthorizedError)
    await expect(
      deleteTask.execute({
        userId: '2',
        slug: 'title',
      })
    ).rejects.toThrow(UnauthorizedError)
  })

  it('should be not delete task  not found', async () => {
    const user = makeUser()

    inMemoryUserRepository.users.push(user)

    const deleteTask = new DeleteTaskUseCase(
      inMemoryUserRepository,
      inMemoryTaskRepository
    )
    await expect(
      deleteTask.execute({
        slug: 'title',
        userId: user.id.toString(),
      })
    ).rejects.toThrow(NotFoundError)
    await expect(
      deleteTask.execute({
        userId: user.id.toString(),
        slug: 'title',
      })
    ).rejects.toThrow(NotFoundError)
  })
  it('should not be able to delete a task from another user', async () => {
    const user = makeUser()

    inMemoryUserRepository.users.push(user)

    const task1 = makeTask({
      userId: user.id.toString(),
    })

    inMemoryTaskRepository.create(task1)
    const deleteTask = new DeleteTaskUseCase(
      inMemoryUserRepository,
      inMemoryTaskRepository
    )
    await expect(
      deleteTask.execute({
        userId: '1',
        slug: task1.slug.value,
      })
    ).rejects.toThrow(UnauthorizedError)
  })
})

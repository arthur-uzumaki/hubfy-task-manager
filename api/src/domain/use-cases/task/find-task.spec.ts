import { beforeEach, describe, expect, it } from 'vitest'
import { makeTask } from '../../../../test/factories/make-task.ts'
import { makeUser } from '../../../../test/factories/make-user.ts'
import { InMemoryTaskRepository } from '../../../../test/repositories/task/in-memory-task-repository.ts'
import { InMemoryUserRepository } from '../../../../test/repositories/user/in-memory-user-repository.ts'
import { NotFoundError } from '../_erros/not-found.ts'
import { UnauthorizedError } from '../_erros/unauthorized-error.ts'
import { FindTaskUseCase } from './find-task.ts'

describe('Find  task', () => {
  let inMemoryUserRepository: InMemoryUserRepository
  let inMemoryTaskRepository: InMemoryTaskRepository

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryTaskRepository = new InMemoryTaskRepository()
  })

  it('should be able find   task', async () => {
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

    const findTask = new FindTaskUseCase(
      inMemoryUserRepository,
      inMemoryTaskRepository
    )

    const result = await findTask.execute({
      userId: user.id.toString(),
      slug: task1.slug.value,
    })

    expect(result.task).toEqual(task1)
  })
  it('should be not find task  user not unauthorized', async () => {
    const findTask = new FindTaskUseCase(
      inMemoryUserRepository,
      inMemoryTaskRepository
    )
    await expect(
      findTask.execute({
        slug: 'title',
        userId: 'sdsfdfds',
      })
    ).rejects.toThrow(UnauthorizedError)
    await expect(
      findTask.execute({
        userId: '2',
        slug: 'title',
      })
    ).rejects.toThrow(UnauthorizedError)
  })

  it('should be not find task  not found', async () => {
    const user = makeUser()

    inMemoryUserRepository.users.push(user)
    const findTask = new FindTaskUseCase(
      inMemoryUserRepository,
      inMemoryTaskRepository
    )
    await expect(
      findTask.execute({
        slug: 'title',
        userId: user.id.toString(),
      })
    ).rejects.toThrow(NotFoundError)
    await expect(
      findTask.execute({
        userId: user.id.toString(),
        slug: 'title',
      })
    ).rejects.toThrow(NotFoundError)
  })
})

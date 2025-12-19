import { beforeEach, describe, expect, it } from 'vitest'
import { makeTask } from '../../../../test/factories/make-task.ts'
import { makeUser } from '../../../../test/factories/make-user.ts'
import { InMemoryTaskRepository } from '../../../../test/repositories/task/in-memory-task-repository.ts'
import { InMemoryUserRepository } from '../../../../test/repositories/user/in-memory-user-repository.ts'
import { FindUserTasksCountUseCase } from './find-user-tasks-count.ts'

describe('Find user tasks count', () => {
  let inMemoryTaskRepository: InMemoryTaskRepository
  let sut: FindUserTasksCountUseCase
  let inMemoryUserRepository: InMemoryUserRepository

  beforeEach(() => {
    inMemoryTaskRepository = new InMemoryTaskRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new FindUserTasksCountUseCase(
      inMemoryUserRepository,
      inMemoryTaskRepository
    )
  })

  it('should be able to count tasks created by the user', async () => {
    const user = makeUser()
    inMemoryUserRepository.create(user)

    const task1 = makeTask({ userId: user.id.toString() })
    const task2 = makeTask({ userId: user.id.toString() })
    const task3 = makeTask({ userId: user.id.toString() })
    const task4 = makeTask({ userId: user.id.toString() })
    const task5 = makeTask({ userId: user.id.toString() })

    await inMemoryTaskRepository.create(task1)
    await inMemoryTaskRepository.create(task2)
    await inMemoryTaskRepository.create(task3)
    await inMemoryTaskRepository.create(task4)
    await inMemoryTaskRepository.create(task5)

    const result = await sut.execute({
      userId: user.id.toString(),
    })

    expect(result.count).toBe(5)
  })
})

import { beforeEach, describe, expect, it } from 'vitest'
import { makeTask } from '../../../../test/factories/make-task.ts'
import { makeUser } from '../../../../test/factories/make-user.ts'
import { InMemoryTaskRepository } from '../../../../test/repositories/task/in-memory-task-repository.ts'
import { InMemoryUserRepository } from '../../../../test/repositories/user/in-memory-user-repository.ts'

import { FindAllTasksUseCase } from './find-all-tasks.ts'

describe('Find all task', () => {
  let inMemoryUserRepository: InMemoryUserRepository
  let inMemoryTaskRepository: InMemoryTaskRepository

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryTaskRepository = new InMemoryTaskRepository()
  })

  it('should be able find all  tasks', async () => {
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

    const findAllTasks = new FindAllTasksUseCase(
      inMemoryUserRepository,
      inMemoryTaskRepository
    )

    const result = await findAllTasks.execute({ userId: user.id.toString() })

    expect(result.tasks).toHaveLength(5)
    expect(result.tasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userId: user.id.toString(),
        }),
      ])
    )
  })
})

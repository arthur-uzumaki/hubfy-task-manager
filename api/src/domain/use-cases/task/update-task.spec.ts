import { beforeEach, describe, expect, it } from 'vitest'
import { makeTask } from '../../../../test/factories/make-task.ts'
import { makeUser } from '../../../../test/factories/make-user.ts'
import { InMemoryTaskRepository } from '../../../../test/repositories/task/in-memory-task-repository.ts'
import { InMemoryUserRepository } from '../../../../test/repositories/user/in-memory-user-repository.ts'
import { NotFoundError } from '../_erros/not-found.ts'
import { UnauthorizedError } from '../_erros/unauthorized-error.ts'
import { UpdateTaskTaskUseCase } from './update-task.ts'

describe('Update task', () => {
  let inMemoryUserRepository: InMemoryUserRepository
  let inMemoryTaskRepository: InMemoryTaskRepository

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryTaskRepository = new InMemoryTaskRepository()
  })

  it('should be able update  task', async () => {
    const user = makeUser()

    inMemoryUserRepository.users.push(user)

    const task1 = makeTask({
      userId: user.id.toString(),
    })

    inMemoryTaskRepository.create(task1)

    const updateTask = new UpdateTaskTaskUseCase(
      inMemoryUserRepository,
      inMemoryTaskRepository
    )

    await updateTask.execute({
      userId: user.id.toString(),
      slug: task1.slug.value,
      title: 'Finalizar o relatório do projeto',
      description:
        'Concluir e revisar o relatório do projeto antes da reunião final.',
      status: 'completed',
    })

    expect(inMemoryTaskRepository.tasks[0].title).toBe(
      'Finalizar o relatório do projeto'
    )
    expect(inMemoryTaskRepository.tasks[0].description).toBe(
      'Concluir e revisar o relatório do projeto antes da reunião final.'
    )
    expect(inMemoryTaskRepository.tasks[0].status).toBe('completed')
  })

  it('should be not update task  user not unauthorized', async () => {
    const updateTask = new UpdateTaskTaskUseCase(
      inMemoryUserRepository,
      inMemoryTaskRepository
    )
    const user = makeUser()

    inMemoryUserRepository.users.push(user)
    const task1 = makeTask({
      userId: user.id.toString(),
    })

    inMemoryTaskRepository.create(task1)
    await expect(
      updateTask.execute({
        userId: '1',
        slug: task1.slug.value,
        title: 'Finalizar o relatório do projeto',
        description:
          'Concluir e revisar o relatório do projeto antes da reunião final.',
        status: 'completed',
      })
    ).rejects.toThrow(UnauthorizedError)
  })

  it('should be not update task  not found', async () => {
    const user = makeUser()

    inMemoryUserRepository.users.push(user)

    const updateTask = new UpdateTaskTaskUseCase(
      inMemoryUserRepository,
      inMemoryTaskRepository
    )
    await expect(
      updateTask.execute({
        userId: user.id.toString(),
        slug: 'fddfds',
        title: 'Finalizar o relatório do projeto',
        description:
          'Concluir e revisar o relatório do projeto antes da reunião final.',
        status: 'completed',
      })
    ).rejects.toThrow(NotFoundError)
  })

  it('should not be able to update a task from another user', async () => {
    const user = makeUser()

    inMemoryUserRepository.users.push(user)

    const task1 = makeTask({
      userId: user.id.toString(),
    })

    inMemoryTaskRepository.create(task1)

    const updateTask = new UpdateTaskTaskUseCase(
      inMemoryUserRepository,
      inMemoryTaskRepository
    )
    await expect(
      updateTask.execute({
        userId: '1',
        slug: task1.slug.value,
        title: 'Finalizar o relatório do projeto',
        description:
          'Concluir e revisar o relatório do projeto antes da reunião final.',
        status: 'completed',
      })
    ).rejects.toThrow(UnauthorizedError)
  })
})

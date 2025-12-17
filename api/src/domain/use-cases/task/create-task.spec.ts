import { beforeEach, describe, expect, it } from 'vitest'
import { makeUser } from '../../../../test/factories/make-user.ts'
import { InMemoryTaskRepository } from '../../../../test/repositories/task/in-memory-task-repository.ts'
import { InMemoryUserRepository } from '../../../../test/repositories/user/in-memory-user-repository.ts'
import { UnauthorizedError } from '../_erros/unauthorized-error.ts'
import { CreateTaskUseCase } from './create-task.ts'

describe('Create task', () => {
  let inMemoryUserRepository: InMemoryUserRepository
  let inMemoryTaskRepository: InMemoryTaskRepository

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryTaskRepository = new InMemoryTaskRepository()
  })

  it('should be able create task', async () => {
    const user = makeUser()

    inMemoryUserRepository.users.push(user)

    const createTask = new CreateTaskUseCase(
      inMemoryUserRepository,
      inMemoryTaskRepository
    )

    const result = await createTask.execute({
      userId: user.id.toString(),
      title: 'Finalizar o relatório do projeto',
      description:
        'Concluir e revisar o relatório do projeto antes da reunião final.',
      status: 'pending',
    })

    expect(inMemoryTaskRepository.tasks[0].id.toString()).toEqual(result.taskId)
    expect(result).toBeTruthy()
  })
  it('should be not create tasks  user not unauthorized', async () => {
    const createTask = new CreateTaskUseCase(
      inMemoryUserRepository,
      inMemoryTaskRepository
    )
    await expect(
      createTask.execute({
        userId: '2',
        title: 'Finalizar o relatório do projeto',
        description:
          'Concluir e revisar o relatório do projeto antes da reunião final.',
        status: 'pending',
      })
    ).rejects.toThrow(UnauthorizedError)
    await expect(
      createTask.execute({
        userId: '2',
        title: 'Finalizar o relatório do projeto',
        description:
          'Concluir e revisar o relatório do projeto antes da reunião final.',
        status: 'pending',
      })
    ).rejects.toThrow(UnauthorizedError)
  })
})

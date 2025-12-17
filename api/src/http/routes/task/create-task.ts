import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { CreateTaskUseCase } from '../../../domain/use-cases/task/create-task.ts'
import { TaskRepositoryDrizzle } from '../../db/repositories/task/task-repository-drizzle.ts'
import { UserRepositoryDrizzle } from '../../db/repositories/user/user-repository-drizzle.ts'
import { auth } from '../../middlewares/auth.ts'

export const createTaskRoute: FastifyPluginAsyncZod = async app => {
  app.register(auth).post(
    '/tasks',
    {
      schema: {
        tags: ['task'],
        summary: 'create task',
        security: [{ bearerAuth: [] }],
        body: z.object({
          title: z.string().min(3),
          description: z.string().optional(),
          status: z.enum(['pending', 'in_progress', 'completed']),
        }),
        response: {
          201: z.object({
            taskId: z.uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId()
      const { title, description, status } = request.body

      const userRepositoryDrizzle = new UserRepositoryDrizzle()
      const taskRepositoryDrizzle = new TaskRepositoryDrizzle()

      const createTaskUseCase = new CreateTaskUseCase(
        userRepositoryDrizzle,
        taskRepositoryDrizzle
      )

      const result = await createTaskUseCase.execute({
        userId,
        description,
        title,
        status,
      })

      return reply.status(201).send({ taskId: result.taskId })
    }
  )
}

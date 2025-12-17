import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { UpdateTaskTaskUseCase } from '../../../domain/use-cases/task/update-task.ts'
import { TaskRepositoryDrizzle } from '../../db/repositories/task/task-repository-drizzle.ts'
import { UserRepositoryDrizzle } from '../../db/repositories/user/user-repository-drizzle.ts'
import { auth } from '../../middlewares/auth.ts'

export const updateTaskRoute: FastifyPluginAsyncZod = async app => {
  app.register(auth).put(
    '/tasks/:slug',
    {
      schema: {
        tags: ['task'],
        summary: 'Update a task',
        security: [{ bearerAuth: [] }],
        params: z.object({
          slug: z.string(),
        }),
        body: z.object({
          title: z.string().min(3),
          description: z.string().optional(),
          status: z.enum(['pending', 'in_progress', 'completed']),
        }),
        response: {
          204: z.void(),
        },
      },
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId()
      const { slug } = request.params
      const { description, status, title } = request.body

      const userRepositoryDrizzle = new UserRepositoryDrizzle()
      const taskRepositoryDrizzle = new TaskRepositoryDrizzle()

      const updateTaskUseCase = new UpdateTaskTaskUseCase(
        userRepositoryDrizzle,
        taskRepositoryDrizzle
      )

      await updateTaskUseCase.execute({
        userId,
        slug,
        title,
        description,
        status,
      })

      return reply.status(204).send()
    }
  )
}

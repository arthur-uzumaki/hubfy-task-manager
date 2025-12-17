import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { UpdateTaskStatusUseCase } from '../../../domain/use-cases/task/update-task-status.ts'
import { TaskRepositoryDrizzle } from '../../db/repositories/task/task-repository-drizzle.ts'
import { UserRepositoryDrizzle } from '../../db/repositories/user/user-repository-drizzle.ts'
import { auth } from '../../middlewares/auth.ts'

export const updateTaskStatusRoute: FastifyPluginAsyncZod = async app => {
  app.register(auth).patch(
    '/tasks/:slug/status',
    {
      schema: {
        tags: ['task'],
        summary: 'Update a task status',
        security: [{ bearerAuth: [] }],
        params: z.object({
          slug: z.string(),
        }),
        body: z.object({
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
      const { status } = request.body

      const userRepositoryDrizzle = new UserRepositoryDrizzle()
      const taskRepositoryDrizzle = new TaskRepositoryDrizzle()

      const updateTaskStatusUseCase = new UpdateTaskStatusUseCase(
        userRepositoryDrizzle,
        taskRepositoryDrizzle
      )

      await updateTaskStatusUseCase.execute({
        userId,
        slug,
        status,
      })

      return reply.status(204).send()
    }
  )
}

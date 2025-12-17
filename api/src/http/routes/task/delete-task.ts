import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { DeleteTaskUseCase } from '../../../domain/use-cases/task/delete-task.ts'
import { TaskRepositoryDrizzle } from '../../db/repositories/task/task-repository-drizzle.ts'
import { UserRepositoryDrizzle } from '../../db/repositories/user/user-repository-drizzle.ts'
import { auth } from '../../middlewares/auth.ts'

export const deleteTaskRoute: FastifyPluginAsyncZod = async app => {
  app.register(auth).delete(
    '/tasks/:slug',
    {
      schema: {
        tags: ['task'],
        summary: 'Delete task',
        params: z.object({
          slug: z.string(),
        }),
        security: [{ bearerAuth: [] }],
        response: {
          204: z.void(),
        },
      },
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId()
      const { slug } = request.params

      const userRepositoryDrizzle = new UserRepositoryDrizzle()
      const taskRepositoryDrizzle = new TaskRepositoryDrizzle()

      const deleteTask = new DeleteTaskUseCase(
        userRepositoryDrizzle,
        taskRepositoryDrizzle
      )

      await deleteTask.execute({
        userId,
        slug,
      })

      return reply.status(204).send()
    }
  )
}

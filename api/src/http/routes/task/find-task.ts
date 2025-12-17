import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { FindTaskUseCase } from '../../../domain/use-cases/task/find-task.ts'
import { TaskRepositoryDrizzle } from '../../db/repositories/task/task-repository-drizzle.ts'
import { UserRepositoryDrizzle } from '../../db/repositories/user/user-repository-drizzle.ts'
import { auth } from '../../middlewares/auth.ts'

export const findTaskRoute: FastifyPluginAsyncZod = async app => {
  app.register(auth).get(
    '/tasks/:slug',
    {
      schema: {
        tags: ['task'],
        summary: 'Get a task details',
        security: [{ bearerAuth: [] }],
        params: z.object({
          slug: z.string(),
        }),
        response: {
          200: z.object({
            task: z.object({
              id: z.string(),
              userId: z.string(),
              title: z.string(),
              description: z.string().optional(),
              status: z.enum(['pending', 'in_progress', 'completed']),
              slug: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId()
      const { slug } = request.params

      const userRepositoryDrizzle = new UserRepositoryDrizzle()
      const taskRepositoryDrizzle = new TaskRepositoryDrizzle()

      const findTaskUseCase = new FindTaskUseCase(
        userRepositoryDrizzle,
        taskRepositoryDrizzle
      )

      const result = await findTaskUseCase.execute({
        slug,
        userId,
      })

      const { task } = result

      const responseTask = {
        id: String(task.id),
        userId: task.userId,
        title: task.title,
        description: task.description,
        status: task.status,
        slug: task.slug.value,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      }

      return reply.status(200).send({ task: responseTask })
    }
  )
}

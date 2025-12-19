import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { FindUserTasksCountUseCase } from '../../../domain/use-cases/task/find-user-tasks-count.ts'
import { TaskRepositoryDrizzle } from '../../db/repositories/task/task-repository-drizzle.ts'
import { UserRepositoryDrizzle } from '../../db/repositories/user/user-repository-drizzle.ts'
import { auth } from '../../middlewares/auth.ts'

export const findUserTasksCountsRoute: FastifyPluginAsyncZod = async app => {
  app.register(auth).get(
    '/tasks/count',
    {
      schema: {
        tags: ['task'],
        summary: 'Find user tasks counts',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.object({
            count: z.number().int().nonnegative(),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId()

      const userRepositoryDrizzle = new UserRepositoryDrizzle()
      const taskRepositoryDrizzle = new TaskRepositoryDrizzle()

      const findUserTasksCountsUseCase = new FindUserTasksCountUseCase(
        userRepositoryDrizzle,
        taskRepositoryDrizzle
      )

      const result = await findUserTasksCountsUseCase.execute({ userId })

      const { count } = result

      return reply.status(200).send({ count })
    }
  )
}

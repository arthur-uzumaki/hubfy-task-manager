import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { DeleteCountUseCase } from '../../../domain/use-cases/user/delete-count.ts'
import { UserRepositoryDrizzle } from '../../db/repositories/user/user-repository-drizzle.ts'
import { auth } from '../../middlewares/auth.ts'

export const deleteCountRoute: FastifyPluginAsyncZod = async app => {
  app.register(auth).delete(
    '/users',
    {
      schema: {
        tags: ['user'],
        summary: 'Delete count user',
        security: [{ bearerAuth: [] }],
        response: {
          204: z.void(),
        },
      },
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId()

      const userRepositoryDrizzle = new UserRepositoryDrizzle()

      const deleteCountUseCase = new DeleteCountUseCase(userRepositoryDrizzle)

      await deleteCountUseCase.execute({ userId })

      return reply.status(204).send()
    }
  )
}

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { ProfileUseCase } from '../../../domain/use-cases/user/profile.ts'
import { UserRepositoryDrizzle } from '../../db/repositories/user/user-repository-drizzle.ts'
import { auth } from '../../middlewares/auth.ts'

export const profileRoute: FastifyPluginAsyncZod = async app => {
  app.register(auth).get(
    '/me',
    {
      schema: {
        tags: ['user'],
        summary: 'Get profile user',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.object({
            user: z.object({
              id: z.uuid(),
              name: z.string(),
              email: z.string(),
              password: z.string(),
              createdAt: z.date(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId()
      const userRepositoryDrizzle = new UserRepositoryDrizzle()

      const profileUseCase = new ProfileUseCase(userRepositoryDrizzle)

      const result = await profileUseCase.execute({ userId })

      const user = {
        id: result.user.id.toString(),
        name: result.user.name,
        email: result.user.email,
        password: result.user.password,
        createdAt: result.user.createdAt,
      }
      return reply.status(200).send({ user })
    }
  )
}

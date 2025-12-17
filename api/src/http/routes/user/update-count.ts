import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { UpdateCountUseCase } from '../../../domain/use-cases/user/update-count.ts'
import { BcryptHasher } from '../../cryptography/bcrypt-hasher.ts'
import { UserRepositoryDrizzle } from '../../db/repositories/user/user-repository-drizzle.ts'
import { auth } from '../../middlewares/auth.ts'

export const updateCountRoute: FastifyPluginAsyncZod = async app => {
  app.register(auth).put(
    '/users',
    {
      schema: {
        tags: ['user'],
        summary: 'Update user count',
        body: z.object({
          name: z.string().min(5).optional(),
          email: z.email().min(4).optional(),
          password: z.string().min(8).optional(),
        }),
        response: {
          204: z.void(),
        },
      },
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId()
      const { email, name, password } = request.body

      const userRepositoryDrizzle = new UserRepositoryDrizzle()
      const bcryptHasher = new BcryptHasher()

      const updateCountUseCase = new UpdateCountUseCase(
        userRepositoryDrizzle,
        bcryptHasher
      )

      await updateCountUseCase.execute({
        userId,
        name: name ?? '',
        email: email ?? '',
        password: password ?? '',
      })

      return reply.status(204).send()
    }
  )
}

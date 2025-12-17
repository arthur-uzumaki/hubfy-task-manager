import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { CreateUserUseCase } from '../../../domain/use-cases/user/create-user.ts'
import { BcryptHasher } from '../../cryptography/bcrypt-hasher.ts'
import { UserRepositoryDrizzle } from '../../db/repositories/user/user-repository-drizzle.ts'

export const createUserRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/users',
    {
      schema: {
        tags: ['user'],
        summary: 'Create a new user',
        body: z.object({
          name: z.string().min(5),
          email: z.email().min(4),
          password: z.string().min(8),
        }),
        response: {
          201: z.object({
            userId: z.uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, name, password } = request.body
      const userRepositoryDrizzle = new UserRepositoryDrizzle()
      const bcryptHasher = new BcryptHasher()

      const createUserCase = new CreateUserUseCase(
        userRepositoryDrizzle,
        bcryptHasher
      )

      const result = await createUserCase.execute({
        name,
        email,
        password,
      })

      return reply.status(201).send({ userId: result.userId })
    }
  )
}

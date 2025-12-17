import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { AuthenticateUseCase } from '../../../domain/use-cases/user/authenticate.ts'
import { BcryptHasher } from '../../cryptography/bcrypt-hasher.ts'
import { JwtEncrypter } from '../../cryptography/jwt-encrypter.ts'
import { UserRepositoryDrizzle } from '../../db/repositories/user/user-repository-drizzle.ts'

export const authenticateUserRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/sessions',
    {
      schema: {
        tags: ['user'],
        summary: 'Authenticate a user',
        body: z.object({
          email: z.email(),
          password: z.string(),
        }),
        response: {
          201: z.object({
            accessToken: z.jwt(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body
      const userRepositoryDrizzle = new UserRepositoryDrizzle()
      const bcryptCompare = new BcryptHasher()
      const jwtEncrypter = new JwtEncrypter(app)

      const authenticate = new AuthenticateUseCase(
        userRepositoryDrizzle,
        bcryptCompare,
        jwtEncrypter
      )

      const result = await authenticate.execute({
        email,
        password,
      })

      return reply.status(201).send({ accessToken: result.accessToken })
    }
  )
}

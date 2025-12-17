import fastifyPlugin from 'fastify-plugin'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { UnauthorizedError } from '../../domain/use-cases/_erros/unauthorized-error.ts'

export const auth: FastifyPluginAsyncZod = fastifyPlugin(async app => {
  app.addHook('preHandler', async request => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()
        return sub
      } catch {
        throw new UnauthorizedError('Invalid auth token')
      }
    }
  })
})

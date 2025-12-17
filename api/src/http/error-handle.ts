import type { FastifyInstance } from 'fastify'
import { BadRequestError } from '../domain/use-cases/_erros/bad-request.ts'
import { NotFoundError } from '../domain/use-cases/_erros/not-found.ts'
import { UnauthorizedError } from '../domain/use-cases/_erros/unauthorized-error.ts'

type ErrorHandleFastify = FastifyInstance['errorHandler']

export const errorHandle: ErrorHandleFastify = (error, request, reply) => {
  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({
      message: error.message,
    })
  }

  if (error instanceof NotFoundError) {
    return reply.status(404).send({
      message: error.message,
    })
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
}

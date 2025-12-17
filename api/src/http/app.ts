import { fastifyCors } from '@fastify/cors'
import { fastifyJwt } from '@fastify/jwt'
import { fastifySwagger } from '@fastify/swagger'
import scalar from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from '../env/env.ts'
import { errorHandle } from './error-handle.ts'
import { createTaskRoute } from './routes/task/create-task.ts'
import { deleteTaskRoute } from './routes/task/delete-task.ts'
import { findAllTasksRoute } from './routes/task/find-all-tasks.ts'
import { findTaskRoute } from './routes/task/find-task.ts'
import { updateTaskRoute } from './routes/task/update-task.ts'
import { updateTaskStatusRoute } from './routes/task/update-task-status.ts'
import { authenticateUserRoute } from './routes/user/authenticate-user.ts'
import { createUserRoute } from './routes/user/create-user.ts'
import { deleteCountRoute } from './routes/user/delete-count.ts'
import { profileRoute } from './routes/user/profile.ts'
import { updateCountRoute } from './routes/user/update-count.ts'

export const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandle)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors, {
  origin: env.BASE_WEB_URL,
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Teste técnico',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

if (env.NODE_ENV === 'development') {
  app.register(scalar, {
    routePrefix: '/docs',
  })
}

app.register(createUserRoute)
app.register(authenticateUserRoute)
app.register(profileRoute)
app.register(deleteCountRoute)
app.register(updateCountRoute)

app.register(createTaskRoute)
app.register(deleteTaskRoute)
app.register(updateTaskRoute)
app.register(findTaskRoute)
app.register(findAllTasksRoute)
app.register(updateTaskStatusRoute)

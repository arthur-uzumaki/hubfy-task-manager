import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { FindAllTasksUseCase } from '../../../domain/use-cases/task/find-all-tasks.ts'
import { TaskRepositoryDrizzle } from '../../db/repositories/task/task-repository-drizzle.ts'
import { UserRepositoryDrizzle } from '../../db/repositories/user/user-repository-drizzle.ts'
import { auth } from '../../middlewares/auth.ts'

export const findAllTasksRoute: FastifyPluginAsyncZod = async app => {
  app.register(auth).get(
    '/tasks',
    {
      schema: {
        tags: ['task'],
        summary: 'Get all tasks',
        response: {
          200: z.object({
            tasks: z.array(
              z.object({
                id: z.string(),
                userId: z.string(),
                title: z.string(),
                description: z.string().optional(),
                status: z.enum(['pending', 'in_progress', 'completed']),
                slug: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId()

      const userRepositoryDrizzle = new UserRepositoryDrizzle()
      const taskRepositoryDrizzle = new TaskRepositoryDrizzle()

      const findAllTasksUseCase = new FindAllTasksUseCase(
        userRepositoryDrizzle,
        taskRepositoryDrizzle
      )

      const result = await findAllTasksUseCase.execute({ userId })

      const { tasks } = result

      const tasksResponse = tasks.map(task => {
        return {
          id: String(task.id),
          userId: task.userId,
          title: task.title,
          description: task.description,
          status: task.status,
          slug: String(task.slug.value),
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        }
      })

      return reply.status(200).send({ tasks: tasksResponse })
    }
  )
}

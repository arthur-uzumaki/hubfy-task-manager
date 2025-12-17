import request from 'supertest'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { makeTaskDrizzle } from '../../../../test/factories/make-task-drizzle.ts'
import { makeAuthenticateUser } from '../../../../test/factories/make-user-drizzle.ts'
import { app } from '../../app.ts'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

describe('Find a all tasks e2e', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  beforeEach(async () => {
    await db.delete(schema.task)
    await db.delete(schema.user)
  })

  it('should be able find a all tasks', async () => {
    const { accessToken, userId } = await makeAuthenticateUser()

    await makeTaskDrizzle({ userId })
    await makeTaskDrizzle({ userId })
    await makeTaskDrizzle({ userId })
    await makeTaskDrizzle({ userId })

    const response = await request(app.server)
      .get(`/tasks`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      tasks: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          userId: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
          slug: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ]),
    })
  })

  it('should be not find a all when user unauthorized', async () => {
    const { accessToken, userId } = await makeAuthenticateUser()
    await makeTaskDrizzle({ userId })
    await makeTaskDrizzle({ userId })

    const response = await request(app.server)
      .get(`/tasks`)
      .set('Authorization', `Bearer ${accessToken} + unauthorized`)

    expect(response.status).toEqual(401)
  })
})

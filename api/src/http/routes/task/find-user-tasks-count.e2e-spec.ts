import request from 'supertest'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { makeTaskDrizzle } from '../../../../test/factories/make-task-drizzle.ts'
import { makeAuthenticateUser } from '../../../../test/factories/make-user-drizzle.ts'
import { app } from '../../app.ts'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

describe('Find  user  tasks count e2e', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  beforeEach(async () => {
    await db.delete(schema.task)
    await db.delete(schema.user)
  })

  it('should be able to find user tasks count', async () => {
    const { accessToken, userId } = await makeAuthenticateUser()

    await makeTaskDrizzle({ userId })
    await makeTaskDrizzle({ userId })
    await makeTaskDrizzle({ userId })

    const response = await request(app.server)
      .get('/tasks/count')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      count: 3,
    })
  })
  it('should return only tasks from authenticated user', async () => {
    const { accessToken, userId } = await makeAuthenticateUser()
    const otherUser = await makeAuthenticateUser()

    await makeTaskDrizzle({ userId })
    await makeTaskDrizzle({ userId })
    await makeTaskDrizzle({ userId: otherUser.userId })

    const response = await request(app.server)
      .get('/tasks/count')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200)
    expect(response.body.count).toBe(2)
  })
  it('should be not able to find user tasks count unauthorized', async () => {
    const { accessToken, userId } = await makeAuthenticateUser()

    await makeTaskDrizzle({ userId })

    const response = await request(app.server)
      .delete(`/tasks/count`)
      .set('Authorization', `Bearer ${accessToken} + unauthorized`)

    expect(response.status).toEqual(401)
  })
})

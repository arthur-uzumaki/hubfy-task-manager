import request from 'supertest'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { makeTaskDrizzle } from '../../../../test/factories/make-task-drizzle.ts'
import { makeAuthenticateUser } from '../../../../test/factories/make-user-drizzle.ts'
import { app } from '../../app.ts'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

describe('Find a details task e2e', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  beforeEach(async () => {
    await db.delete(schema.task)
    await db.delete(schema.user)
  })

  it('should be able find a details task', async () => {
    const { accessToken, userId } = await makeAuthenticateUser()

    const { slug } = await makeTaskDrizzle({ userId })

    const response = await request(app.server)
      .get(`/tasks/${slug}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toEqual(200)
  })

  it('should be not find a details when slug not found', async () => {
    const { accessToken } = await makeAuthenticateUser()

    const response = await request(app.server)
      .delete(`/tasks/slug-not-found`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toEqual(404)
  })

  it('should be not find a details when user unauthorized', async () => {
    const { accessToken, userId } = await makeAuthenticateUser()

    const { slug } = await makeTaskDrizzle({ userId })

    const response = await request(app.server)
      .delete(`/tasks/${slug}`)
      .set('Authorization', `Bearer ${accessToken} + unauthorized`)

    expect(response.status).toEqual(401)
  })
})

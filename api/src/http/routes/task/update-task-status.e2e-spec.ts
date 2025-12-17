import { eq } from 'drizzle-orm'
import request from 'supertest'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { makeTaskDrizzle } from '../../../../test/factories/make-task-drizzle.ts'
import { makeAuthenticateUser } from '../../../../test/factories/make-user-drizzle.ts'
import { app } from '../../app.ts'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

describe('Update task status e2e', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  beforeEach(async () => {
    await db.delete(schema.task)
    await db.delete(schema.user)
  })

  it('should be able update task status', async () => {
    const { accessToken, userId } = await makeAuthenticateUser()

    const { slug } = await makeTaskDrizzle({ userId })

    const response = await request(app.server)
      .patch(`/tasks/${slug}/status`)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Content-Type', 'application/json')
      .send({
        status: 'in_progress',
      })

    console.log(response.error)

    expect(response.status).toEqual(204)
  })
  it('should be able to update task status', async () => {
    const { accessToken, userId } = await makeAuthenticateUser()

    const { slug } = await makeTaskDrizzle({ userId })

    const response = await request(app.server)
      .patch(`/tasks/${slug}/status`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        status: 'in_progress',
      })

    expect(response.status).toBe(204)

    const taskOnDatabase = await db
      .select()
      .from(schema.task)
      .where(eq(schema.task.slug, slug))
    const task = taskOnDatabase[0]

    expect(taskOnDatabase).toBeTruthy()
    expect(task?.status).toBe('in_progress')
  })
})

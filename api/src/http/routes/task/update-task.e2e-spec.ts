import request from 'supertest'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { makeTaskDrizzle } from '../../../../test/factories/make-task-drizzle.ts'
import { makeAuthenticateUser } from '../../../../test/factories/make-user-drizzle.ts'
import { app } from '../../app.ts'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

describe('Update task e2e', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  beforeEach(async () => {
    await db.delete(schema.task)
    await db.delete(schema.user)
  })

  it('should be able update task', async () => {
    const { accessToken, userId } = await makeAuthenticateUser()

    const { slug } = await makeTaskDrizzle({ userId })

    const response = await request(app.server)
      .put(`/tasks/${slug}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Content-Type', 'application/json')
      .send({
        title: 'Atualizar Website',
        description: 'Atualizar o conteúdo do website da empresa',
        status: 'pending',
      })

    expect(response.status).toEqual(204)
  })

  it('should be not update when slug not found', async () => {
    const { accessToken } = await makeAuthenticateUser()

    const response = await request(app.server)
      .put(`/tasks/slug-not-found`)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Content-Type', 'application/json')
      .send({
        title: 'Atualizar Website',
        description: 'Atualizar o conteúdo do website da empresa',
        status: 'pending',
      })

    expect(response.status).toEqual(404)
    expect(response.body).toEqual({
      message: 'Task not found.',
    })
  })

  it('should be not update when user unauthorized', async () => {
    const { userId } = await makeAuthenticateUser()

    const { slug } = await makeTaskDrizzle({ userId })

    const response = await request(app.server)
      .put(`/tasks/${slug}`)
      .set('Authorization', `Bearer toke invalid`)
      .set('Content-Type', 'application/json')
      .send({
        title: 'Atualizar Website',
        description: 'Atualizar o conteúdo do website da empresa',
        status: 'pending',
      })
    expect(response.status).toEqual(401)
    expect(response.body).toEqual({
      message: 'Invalid auth token',
    })
  })
})

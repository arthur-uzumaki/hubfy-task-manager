import request from 'supertest'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { makeAuthenticateUser } from '../../../../test/factories/make-user-drizzle.ts'
import { app } from '../../app.ts'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

describe('Create task e2e', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  beforeEach(async () => {
    await db.delete(schema.task)
    await db.delete(schema.user)
  })

  it('should be able create task', async () => {
    const { accessToken } = await makeAuthenticateUser()

    const response = await request(app.server)
      .post('/tasks')
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Content-Type', 'application/json')

      .send({
        title: 'Atualizar Website',
        description: 'Atualizar o conteúdo do website da empresa',
        status: 'pending',
      })

    expect(response.status).toEqual(201)
  })

  it('should be not create task when user not unauthorized', async () => {
    const { accessToken } = await makeAuthenticateUser()

    const response = await request(app.server)
      .post('/tasks')
      .set('Authorization', `Bearer ${accessToken} thfdvcxhgb`)
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

import request from 'supertest'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { makeAuthenticateUser } from '../../../../test/factories/make-user-drizzle.ts'
import { app } from '../../app.ts'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

describe('Delete count user e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })
  beforeEach(async () => {
    await db.delete(schema.user)
  })
  it('should be able delete count user', async () => {
    const { accessToken } = await makeAuthenticateUser()

    const response = await request(app.server)
      .delete('/users')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toEqual(204)
  })

  it('should be not delete when user not unauthorized', async () => {
    const { accessToken } = await makeAuthenticateUser()

    const response = await request(app.server)
      .delete('/users')
      .set('Authorization', `Bearer ${accessToken} + ewrewrewer`)

    expect(response.status).toEqual(401)
    expect(response.body).toEqual({
      message: 'Invalid auth token',
    })
  })
})

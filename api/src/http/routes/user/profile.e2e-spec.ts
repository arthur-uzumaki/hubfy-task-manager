import request from 'supertest'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { makeAuthenticateUser } from '../../../../test/factories/make-user-drizzle.ts'
import { app } from '../../app.ts'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

describe('Profile user e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })
  beforeEach(async () => {
    await db.delete(schema.user)
  })
  it('should be able get profile user', async () => {
    const { accessToken } = await makeAuthenticateUser()

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toEqual(200)
  })

  it('should be not profile when user not unauthorized', async () => {
    const { accessToken } = await makeAuthenticateUser()

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${accessToken} + ewrewrewer`)

    expect(response.status).toEqual(401)
    expect(response.body).toEqual({
      message: 'Invalid auth token',
    })
  })
})

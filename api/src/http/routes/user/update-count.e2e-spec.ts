import { faker } from '@faker-js/faker'
import request from 'supertest'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { makeAuthenticateUser } from '../../../../test/factories/make-user-drizzle.ts'
import { app } from '../../app.ts'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

describe('Update count user e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })
  beforeEach(async () => {
    await db.delete(schema.user)
  })
  it('should be able update count user', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    const { accessToken } = await makeAuthenticateUser({ email, password })

    const response = await request(app.server)
      .put('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Content-type', 'application/json')
      .send({
        name: faker.person.fullName(),
        email,
        password,
      })

    expect(response.status).toEqual(204)
    expect(response.text).toBe('')
  })

  it('should be not update when user not unauthorized', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    const { accessToken } = await makeAuthenticateUser({ email, password })
    const response = await request(app.server)
      .put('/users')
      .set('Authorization', `Bearer ${accessToken} + dufhdsoufdsndsflds`)
      .set('Content-type', 'application/json')
      .send({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      })

    expect(response.status).toEqual(401)
    expect(response.body).toEqual({
      message: 'Invalid auth token',
    })
  })
})

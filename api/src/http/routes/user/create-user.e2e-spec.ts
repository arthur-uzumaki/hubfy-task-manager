import { faker } from '@faker-js/faker'
import request from 'supertest'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { makeUserDrizzle } from '../../../../test/factories/make-user-drizzle.ts'
import { app } from '../../app.ts'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

describe('Create user e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })
  beforeEach(async () => {
    await app.ready()

    await db.delete(schema.user)
  })
  it('should be able create user', async () => {
    await app.ready()

    const response = await request(app.server)
      .post('/users')
      .set('Content-type', 'application/json')
      .send({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      })

    expect(response.status).toEqual(201)
  })

  it('should be not create user email unique', async () => {
    await app.ready()

    const email = 'arthursousa@gmail.com'

    await makeUserDrizzle({ email })

    const response = await request(app.server)
      .post('/users')
      .set('Content-type', 'application/json')
      .send({
        name: faker.person.fullName(),
        email,
        password: faker.internet.password(),
      })

    expect(response.status).toEqual(400)
  })
})

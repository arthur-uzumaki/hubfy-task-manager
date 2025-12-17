import request from 'supertest'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { makeUserDrizzle } from '../../../../test/factories/make-user-drizzle.ts'
import { app } from '../../app.ts'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

describe('Authenticate user e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })
  beforeEach(async () => {
    await app.ready()

    await db.delete(schema.user)
  })
  it('should be able authenticate user', async () => {
    const email = 'arthursousa@gmail.com'
    const password = '123456789'

    await makeUserDrizzle({ email, password })

    const response = await request(app.server)
      .post('/sessions')
      .set('Content-type', 'application/json')
      .send({
        email,
        password,
      })

    expect(response.status).toEqual(201)
    expect(response.body).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should be not authenticate user email  credential not valid  ', async () => {
    const email = 'arthursous@gmail.com'
    await makeUserDrizzle({})

    const response = await request(app.server)
      .post('/sessions')
      .set('Content-type', 'application/json')
      .send({
        email,
        password: '123456789',
      })

    expect(response.status).toEqual(400)
    expect(response.body).toEqual({
      message: 'Credentials are not valid.',
    })
  })

  it('should be not authenticate user password  credential not valid  ', async () => {
    const email = 'arthursousa@gmail.com'

    await makeUserDrizzle({ email })

    const response = await request(app.server)
      .post('/sessions')
      .set('Content-type', 'application/json')
      .send({
        email,
        password: '10101010101',
      })

    expect(response.status).toEqual(400)
    expect(response.body).toEqual({
      message: 'Credentials are not valid.',
    })
  })
  it('should be not authenticate user email and  password  credential not valid  ', async () => {
    await makeUserDrizzle({})

    const response = await request(app.server)
      .post('/sessions')
      .set('Content-type', 'application/json')
      .send({
        email: 'art@gmail.com',
        password: '10101010101',
      })

    expect(response.status).toEqual(400)
    expect(response.body).toEqual({
      message: 'Credentials are not valid.',
    })
  })
})

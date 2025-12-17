import { describe, expect, it } from 'vitest'
import { User } from './user.js'

describe('create user', () => {
  it('should create a user entity', () => {
    const user = User.create({
      name: 'John Doe',
      password: 'hashed-password',
      email: 'johndoe@gmail.com',
    })

    expect(user).toBeTruthy()
  })
})

import { describe, expect, it } from 'vitest'
import { Task } from './task.ts'
import { User } from './user.ts'
import { Slug } from './value-object/slug.ts'

describe('creta task', () => {
  it('should able  create a task', () => {
    const user = User.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    const task = Task.create({
      userId: user.id.toString(),
      title: 'New Task',
      description: 'Task description',
      status: 'pending',
      slug: Slug.createFromText('New Task'),
    })

    expect(task).toBeTruthy()
  })
})

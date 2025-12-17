import { Entity } from '../../core/entities/entity.ts'
import type { UniqueEntityId } from '../../core/entities/unique-entity-id.ts'
import type { Replace } from '../../core/replace.js'
import { Slug } from './value-object/slug.ts'

export interface TaskProps {
  userId: string
  title: string
  description?: string
  status: 'pending' | 'in_progress' | 'completed'
  slug: Slug
  createdAt: Date
  updatedAt: Date
}

export class Task extends Entity<TaskProps> {
  public get userId(): string {
    return this.props.userId
  }

  public get title(): string {
    return this.props.title
  }

  public set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  public get slug(): Slug {
    return this.props.slug
  }

  public get description(): string | undefined {
    return this.props.description
  }

  public set description(description: string | undefined) {
    this.props.description = description
  }

  public get status(): 'pending' | 'in_progress' | 'completed' {
    return this.props.status
  }

  public set status(status: 'pending' | 'in_progress' | 'completed') {
    this.props.status = status
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  public get updatedAt(): Date {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
  static create(
    props: Replace<TaskProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: UniqueEntityId
  ) {
    const task = new Task(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id
    )

    return task
  }
}

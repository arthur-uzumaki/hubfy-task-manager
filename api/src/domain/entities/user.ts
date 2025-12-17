import { Entity } from '../../core/entities/entity.ts'
import type { UniqueEntityId } from '../../core/entities/unique-entity-id.ts'
import type { Replace } from '../../core/replace.ts'

export interface UserProps {
  name: string
  email: string
  password: string
  createdAt: Date
}

export class User extends Entity<UserProps> {
  public get name(): string {
    return this.props.name
  }
  public set name(name: string) {
    this.props.name = name
  }
  public get password(): string {
    return this.props.password
  }

  public get email(): string {
    return this.props.email
  }

  public set email(email: string) {
    this.props.email = email
  }

  public set password(password: string) {
    this.props.password = password
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  static create(
    props: Replace<UserProps, { createdAt?: Date }>,
    id?: UniqueEntityId
  ) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return user
  }
}

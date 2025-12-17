import { randomUUID } from 'node:crypto'
export class UniqueEntityId {
  private value: string

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(id?: string) {
    this.value = id ?? randomUUID()
  }

  toEquals(id: UniqueEntityId) {
    return this.value === id.value
  }
}

import { compare, hash } from 'bcrypt'
import type { HashComparer } from '../../domain/cryptography/hash-comparer.ts'
import type { HashGenerator } from '../../domain/cryptography/hash-generator.ts'

export class BcryptHasher implements HashGenerator, HashComparer {
  async compare(plain: string, hashed: string): Promise<boolean> {
    return await compare(plain, hashed)
  }
  async hash(plain: string): Promise<string> {
    return await hash(plain, 8)
  }
}

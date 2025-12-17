import type { HashComparer } from '../../src/domain/cryptography/hash-comparer.ts'
import type { HashGenerator } from '../../src/domain/cryptography/hash-generator.ts'

export class FakeHash implements HashGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }
  async compare(plain: string, hashed: string): Promise<boolean> {
    return plain.concat('-hashed') === hashed
  }
}

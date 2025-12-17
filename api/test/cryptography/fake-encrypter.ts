import type { Encrypter } from '../../src/domain/cryptography/encrypter.ts'

export class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload)
  }
}

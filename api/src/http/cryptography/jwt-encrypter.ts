import type { FastifyInstance } from 'fastify'
import type { Encrypter } from '../../domain/cryptography/encrypter.ts'

export class JwtEncrypter implements Encrypter {
  private readonly app: FastifyInstance

  constructor(app: FastifyInstance) {
    this.app = app
  }
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    const token = this.app.jwt.sign(payload, { expiresIn: '7 days' })

    return token
  }
}

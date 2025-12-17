import { config } from 'dotenv'
import { defineConfig } from 'vitest/config'

config({ path: '.env-test' })

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    exclude: ['node_modules', 'dist', '**/*.spec.ts'],
    pool: 'forks',
    fileParallelism: false,
    coverage: {
      enabled: true,
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['**/*.spec.ts', 'src/tests/**'],
    },
  },
})

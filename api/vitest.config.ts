import { config } from 'dotenv'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    root: './',
    include: ['**/*.spec.ts'],
    exclude: ['**/*.e2e-spec.ts', '**/node_modules/**'],
    environment: 'node',
    coverage: {
      enabled: true,
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['**/*.spec.ts', 'src/tests/**'],
    },
  },
})

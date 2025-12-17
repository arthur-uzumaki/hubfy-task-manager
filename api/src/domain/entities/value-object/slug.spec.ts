import { expect, test } from 'vitest'
import { Slug } from './slug.js'

test('it should be able create new slug from title', () => {
  const slug = Slug.createFromText('Criar uma nova tarefa!')

  expect(slug.value).toBe('criar-uma-nova-tarefa')
})

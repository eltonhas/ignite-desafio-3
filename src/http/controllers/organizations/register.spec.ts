import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should to be able to register an organization', async () => {
    const response = await request(app.server).post('/organizations').send({
      name: 'Elton Pets',
      email: 'elton@test.com.br',
      password: '123456789',
      phone: '79999043059',
      cep: '49100000',
      address: 'Rua união, 470',
      city: 'Aracaju',
      state: 'se',
    })

    expect(response.statusCode).toEqual(201)
  })
})

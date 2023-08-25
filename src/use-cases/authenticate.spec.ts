import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcrypt'

import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialError } from './errors/invalid-credential-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateUseCase(organizationsRepository)
  })

  it('should to be able to authenticate', async () => {
    await organizationsRepository.create({
      name: 'Elton Pets',
      email: 'elton@test.com.br',
      password_hash: await hash('123456789', 6),
      phone: '79999043059',
      cep: '49100000',
      address: 'Rua união, 470',
      city: 'Aracaju',
      state: 'se',
    })

    const { organization } = await sut.execute({
      email: 'elton@test.com.br',
      password: '123456789',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'elton@test.com.br',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should not to authenticate with wrong password', async () => {
    await organizationsRepository.create({
      name: 'Elton Pets',
      email: 'elton@test.com.br',
      password_hash: await hash('123456789', 6),
      phone: '79999043059',
      cep: '49100000',
      address: 'Rua união, 470',
      city: 'Aracaju',
      state: 'se',
    })

    await expect(() =>
      sut.execute({
        email: 'elton@test.com.br',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})

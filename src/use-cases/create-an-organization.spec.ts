import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcrypt'

import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { CreateAnOrganizationUseCase } from './create-an-organization'
import { RessourceNotAvailabelToUSeError } from './errors/ressource-not-available-to-use-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: CreateAnOrganizationUseCase

describe('Create an organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreateAnOrganizationUseCase(organizationsRepository)
  })

  it('should to be able to create an organization', async () => {
    const { organization } = await sut.execute({
      name: 'Elton Pets',
      email: 'elton@test.com.br',
      password: '123456789',
      phone: '79999043059',
      cep: '49100000',
      address: 'Rua união, 470',
      city: 'Aracaju',
      state: 'se',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should hash organization password upon registration', async () => {
    const { organization } = await sut.execute({
      name: 'Elton Pets',
      email: 'elton@test.com.br',
      password: '123456789',
      phone: '79999043059',
      cep: '49100000',
      address: 'Rua união, 470',
      city: 'Aracaju',
      state: 'se',
    })

    const isPasswprdCorrectlyHashed = await compare(
      '123456789',
      organization.password_hash,
    )

    expect(isPasswprdCorrectlyHashed).toBe(true)
  })

  it('should not to be able to register with the same email twice', async () => {
    const email = 'elton@teste.com'

    await sut.execute({
      name: 'Elton Pets',
      email,
      password: '123456789',
      phone: '79999043059',
      cep: '49100000',
      address: 'Rua união, 470',
      city: 'Aracaju',
      state: 'se',
    })

    await expect(() =>
      sut.execute({
        name: 'Elton Pets',
        email,
        password: '123456789',
        phone: '79999043059',
        cep: '49100000',
        address: 'Rua união, 470',
        city: 'Aracaju',
        state: 'se',
      }),
    ).rejects.toBeInstanceOf(RessourceNotAvailabelToUSeError)
  })

  it('should not to be able to register with the same phome twice', async () => {
    const phone = '79999043059'

    await sut.execute({
      name: 'Elton Pets',
      email: 'elton@teste.com',
      password: '123456789',
      phone,
      cep: '49100000',
      address: 'Rua união, 470',
      city: 'Aracaju',
      state: 'se',
    })

    await expect(() =>
      sut.execute({
        name: 'Elton Pets',
        email: 'elton@teste.com',
        password: '123456789',
        phone,
        cep: '49100000',
        address: 'Rua união, 470',
        city: 'Aracaju',
        state: 'se',
      }),
    ).rejects.toBeInstanceOf(RessourceNotAvailabelToUSeError)
  })

  it('should not to be able to register with the same address twice', async () => {
    const address = 'Rua união, 470'

    await sut.execute({
      name: 'Elton Pets',
      email: 'elton@teste.com',
      password: '123456789',
      phone: '79999043059',
      cep: '49100000',
      address,
      city: 'Aracaju',
      state: 'se',
    })

    await expect(() =>
      sut.execute({
        name: 'Elton Pets',
        email: 'elton@teste.com',
        password: '123456789',
        phone: '79999043059',
        cep: '49100000',
        address,
        city: 'Aracaju',
        state: 'se',
      }),
    ).rejects.toBeInstanceOf(RessourceNotAvailabelToUSeError)
  })
})

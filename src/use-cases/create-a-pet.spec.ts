import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcrypt'

import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreateAPetUseCase } from './create-a-pet'
import { RessourceNotFoundError } from './errors/ressource-not-found-error'
import { RessourceNotAvailabelToUSeError } from './errors/ressource-not-available-to-use-error'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: CreateAPetUseCase

describe('Create a pet Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new CreateAPetUseCase(organizationsRepository, petsRepository)
  })

  it('should to be able to create a pet', async () => {
    await organizationsRepository.create({
      id: 'org-01',
      name: 'Elton Pets',
      email: 'elton@test.com.br',
      password_hash: await hash('123456789', 6),
      phone: '79999043059',
      cep: '49100000',
      address: 'Rua união, 470',
      city: 'Aracaju',
      state: 'se',
    })

    const { pet } = await sut.execute({
      name: 'Pingo',
      about: '',
      age: 'ADULT',
      size: 'P',
      energy_level: 1,
      dependency_level: 'P',
      environment: 'P',
      photo: '',
      requirements: 'casa ampla',
      organizationId: 'org-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not to be able to create a pet if organization does not exist', async () => {
    await expect(() =>
      sut.execute({
        name: 'Pingo',
        about: '',
        age: 'ADULT',
        size: 'P',
        energy_level: 1,
        dependency_level: 'P',
        environment: 'P',
        photo: '',
        requirements: 'casa ampla',
        organizationId: 'org-01',
      }),
    ).rejects.toBeInstanceOf(RessourceNotFoundError)
  })

  it('should not to be able to create two pets with same name in an organization', async () => {
    await organizationsRepository.create({
      id: 'org-01',
      name: 'Elton Pets',
      email: 'elton@test.com.br',
      password_hash: await hash('123456789', 6),
      phone: '79999043059',
      cep: '49100000',
      address: 'Rua união, 470',
      city: 'Aracaju',
      state: 'se',
    })

    await sut.execute({
      name: 'Pingo',
      about: '',
      age: 'ADULT',
      size: 'P',
      energy_level: 1,
      dependency_level: 'P',
      environment: 'P',
      photo: '',
      requirements: 'casa ampla',
      organizationId: 'org-01',
    })

    await expect(() =>
      sut.execute({
        name: 'Pingo',
        about: '',
        age: 'ADULT',
        size: 'P',
        energy_level: 1,
        dependency_level: 'P',
        environment: 'P',
        photo: '',
        requirements: 'casa ampla',
        organizationId: 'org-01',
      }),
    ).rejects.toBeInstanceOf(RessourceNotAvailabelToUSeError)
  })
})

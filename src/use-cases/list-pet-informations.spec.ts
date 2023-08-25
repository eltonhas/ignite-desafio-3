import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcrypt'

import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { ListPetInformationsUseCase } from './list-pet-informations'
import { RessourceNotFoundError } from './errors/ressource-not-found-error'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: ListPetInformationsUseCase

describe('List pet informations Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new ListPetInformationsUseCase(petsRepository)
  })

  it('should to be able to list pet informations', async () => {
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
      created_at: new Date(),
    })

    await petsRepository.create({
      id: 'pet-01',
      name: 'Pingo',
      about: '',
      age: 'ADULT',
      size: 'P',
      energy_level: 1,
      dependency_level: 'P',
      environment: 'P',
      photo: '',
      requirements: 'casa ampla',
      organization_id: 'org-01',
    })

    const { pet } = await sut.execute({
      id: 'pet-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not to be able to list informations from a pet that does not exist', async () => {
    await expect(() =>
      sut.execute({
        id: 'pet-01',
      }),
    ).rejects.toBeInstanceOf(RessourceNotFoundError)
  })
})

import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcrypt'

import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RessourceNotFoundError } from './errors/ressource-not-found-error'
import { FindPetsByCharacteristicsUseCase } from './find-pets-by-characteristics'
import { filters } from '@/repositories/pets-repository'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: FindPetsByCharacteristicsUseCase

describe('Find Pets By Characteristics Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FindPetsByCharacteristicsUseCase(
      organizationsRepository,
      petsRepository,
    )
  })

  it('should to be able to list pets by characteristics', async () => {
    const chosenFilters: filters = {
      age: 'ADULT',
      size: 'P',
      energy_level: 1,
      dependency_level: 'P',
      environment: 'P',
      requirements: 'casa ampla',
    }

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
      id: 'pet-02',
      name: 'Pingo2',
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

    await petsRepository.create({
      id: 'pet-03',
      name: 'Pingo3',
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

    const { pets } = await sut.execute({
      city: 'Aracaju',
      chosenFilters,
      page: 1,
    })

    expect(pets).toHaveLength(3)
    expect(pets).toEqual([
      expect.objectContaining({ id: 'pet-02' }),
      expect.objectContaining({ id: 'pet-03' }),
      expect.objectContaining({ id: 'pet-01' }),
    ])
  })

  it('should to be able to list pets with differents characteristics by list', async () => {
    const chosenFilters: filters = {
      age: 'ADULT',
      size: 'P',
      energy_level: 1,
      dependency_level: 'P',
      environment: 'P',
      requirements: 'casa ampla',
    }

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
      id: 'pet-02',
      name: 'Pingo2',
      about: '',
      age: 'ADULT',
      size: 'M',
      energy_level: 1,
      dependency_level: 'P',
      environment: 'P',
      photo: '',
      requirements: 'casa ampla',
      organization_id: 'org-01',
    })

    await petsRepository.create({
      id: 'pet-03',
      name: 'Pingo3',
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

    const { pets } = await sut.execute({
      city: 'Aracaju',
      chosenFilters,
      page: 1,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ id: 'pet-03' }),
      expect.objectContaining({ id: 'pet-01' }),
    ])
  })

  it('should to be able to list pets using optional filters', async () => {
    const chosenFilters: filters = {
      age: 'ADULT',
      energy_level: 1,
      dependency_level: 'P',
    }

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
      id: 'pet-04',
      name: 'Pingo2',
      about: '',
      age: 'ADULT',
      size: 'M',
      energy_level: 1,
      dependency_level: 'G',
      environment: 'P',
      photo: '',
      requirements: 'casa ampla',
      organization_id: 'org-01',
    })

    await petsRepository.create({
      id: 'pet-02',
      name: 'Pingo2',
      about: '',
      age: 'ADULT',
      size: 'M',
      energy_level: 1,
      dependency_level: 'P',
      environment: 'P',
      photo: '',
      requirements: 'casa ampla',
      organization_id: 'org-01',
    })

    await petsRepository.create({
      id: 'pet-03',
      name: 'Pingo3',
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

    const { pets } = await sut.execute({
      city: 'Aracaju',
      chosenFilters,
      page: 1,
    })

    expect(pets).toHaveLength(3)
    expect(pets).toEqual([
      expect.objectContaining({ id: 'pet-02' }),
      expect.objectContaining({ id: 'pet-03' }),
      expect.objectContaining({ id: 'pet-01' }),
    ])
  })

  it('should to be able to list pets using no filters', async () => {
    const chosenFilters: filters = {}

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
      id: 'pet-04',
      name: 'Pingo2',
      about: '',
      age: 'ADULT',
      size: 'M',
      energy_level: 1,
      dependency_level: 'G',
      environment: 'P',
      photo: '',
      requirements: 'casa ampla',
      organization_id: 'org-01',
    })

    await petsRepository.create({
      id: 'pet-02',
      name: 'Pingo2',
      about: '',
      age: 'ADULT',
      size: 'M',
      energy_level: 1,
      dependency_level: 'P',
      environment: 'P',
      photo: '',
      requirements: 'casa ampla',
      organization_id: 'org-01',
    })

    await petsRepository.create({
      id: 'pet-03',
      name: 'Pingo3',
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

    const { pets } = await sut.execute({
      city: 'Aracaju',
      chosenFilters,
      page: 1,
    })

    expect(pets).toHaveLength(4)
    expect(pets).toEqual([
      expect.objectContaining({ id: 'pet-04' }),
      expect.objectContaining({ id: 'pet-02' }),
      expect.objectContaining({ id: 'pet-03' }),
      expect.objectContaining({ id: 'pet-01' }),
    ])
  })

  it('should not to be able to list pets from a diferrent city ', async () => {
    const chosenFilters: filters = {}
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

    await organizationsRepository.create({
      id: 'org-02',
      name: 'Elton Pets',
      email: 'elton@test.com.br',
      password_hash: await hash('123456789', 6),
      phone: '79999043059',
      cep: '49100000',
      address: 'Rua união, 470',
      city: 'Socorro',
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
      organization_id: 'org-02',
    })

    await petsRepository.create({
      id: 'pet-02',
      name: 'Pingo2',
      about: '',
      age: 'ADULT',
      size: 'M',
      energy_level: 1,
      dependency_level: 'P',
      environment: 'P',
      photo: '',
      requirements: 'casa ampla',
      organization_id: 'org-01',
    })

    await petsRepository.create({
      id: 'pet-03',
      name: 'Pingo3',
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

    const { pets } = await sut.execute({
      city: 'Aracaju',
      chosenFilters,
      page: 1,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ id: 'pet-02' }),
      expect.objectContaining({ id: 'pet-03' }),
    ])
  })

  it('should to be able to list pets from a requirements ', async () => {
    const chosenFilters: filters = {
      requirements: 'casa ampla',
    }
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

    await petsRepository.create({
      id: 'pet-02',
      name: 'Pingo2',
      about: '',
      age: 'ADULT',
      size: 'M',
      energy_level: 1,
      dependency_level: 'P',
      environment: 'P',
      photo: '',
      requirements: 'casa ampla',
      organization_id: 'org-01',
    })

    await petsRepository.create({
      id: 'pet-03',
      name: 'Pingo3',
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

    const { pets } = await sut.execute({
      city: 'Aracaju',
      chosenFilters,
      page: 1,
    })

    expect(pets).toHaveLength(3)
    expect(pets).toEqual([
      expect.objectContaining({ id: 'pet-01' }),
      expect.objectContaining({ id: 'pet-02' }),
      expect.objectContaining({ id: 'pet-03' }),
    ])
  })

  it('should not to be able to list pets with differents requirements from the filter', async () => {
    const chosenFilters: filters = {
      requirements: 'casa ampla',
    }
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

    await petsRepository.create({
      id: 'pet-02',
      name: 'Pingo2',
      about: '',
      age: 'ADULT',
      size: 'M',
      energy_level: 1,
      dependency_level: 'P',
      environment: 'P',
      photo: '',
      requirements: 'casa ampla',
      organization_id: 'org-01',
    })

    await petsRepository.create({
      id: 'pet-03',
      name: 'Pingo3',
      about: '',
      age: 'ADULT',
      size: 'P',
      energy_level: 1,
      dependency_level: 'P',
      environment: 'P',
      photo: '',
      requirements: 'casa pequena',
      organization_id: 'org-01',
    })

    const { pets } = await sut.execute({
      city: 'Aracaju',
      chosenFilters,
      page: 1,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ id: 'pet-01' }),
      expect.objectContaining({ id: 'pet-02' }),
    ])
  })

  it('should to be able to list pets with more then one requirement', async () => {
    const chosenFilters: filters = {
      requirements: 'casa arejada',
    }
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

    await petsRepository.create({
      id: 'pet-02',
      name: 'Pingo2',
      about: '',
      age: 'ADULT',
      size: 'M',
      energy_level: 1,
      dependency_level: 'P',
      environment: 'P',
      photo: '',
      requirements: 'casa ampla',
      organization_id: 'org-01',
    })

    await petsRepository.create({
      id: 'pet-03',
      name: 'Pingo3',
      about: '',
      age: 'ADULT',
      size: 'P',
      energy_level: 1,
      dependency_level: 'P',
      environment: 'P',
      photo: '',
      requirements: 'casa ampla e casa arejada',
      organization_id: 'org-01',
    })

    const { pets } = await sut.execute({
      city: 'Aracaju',
      chosenFilters,
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ id: 'pet-03' })])
  })

  it('should not to be able to list pets without organization', async () => {
    const chosenFilters: filters = {}

    await expect(() =>
      sut.execute({
        city: 'Aracaju',
        chosenFilters,
        page: 1,
      }),
    ).rejects.toBeInstanceOf(RessourceNotFoundError)
  })

  it('should not to be able to list pets from an organization that does not have pets registered', async () => {
    const chosenFilters: filters = {}

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

    await expect(() =>
      sut.execute({
        city: 'Aracaju',
        chosenFilters,
        page: 1,
      }),
    ).rejects.toBeInstanceOf(RessourceNotFoundError)
  })
})

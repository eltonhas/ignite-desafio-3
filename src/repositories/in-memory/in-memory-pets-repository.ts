import { randomUUID } from 'node:crypto'

import { Pet, Prisma } from '@prisma/client'
import { PetsRepository, filters } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about || null,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      dependency_level: data.dependency_level,
      environment: data.environment,
      photo: data.photo || null,
      requirements: data.requirements,
      organization_id: data.organization_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findByNameAndOrganization(name: string, organizationId: string) {
    const pet = this.items.find(
      (item) => item.name === name && item.organization_id === organizationId,
    )

    if (!pet) {
      return null
    }

    return pet
  }

  async filterByOrganization(organizationId: string, page: number) {
    const pet = this.items
      .filter((item) => item.organization_id === organizationId)
      .slice((page - 1) * 20, page * 20)

    return pet
  }

  async filterByCharacteristics(
    petsByCity: Pet[],
    filters: filters,
    page: number,
  ) {
    const pets = petsByCity
      .filter((item) => {
        return (
          (!filters.age || item.age === filters.age) &&
          (!filters.size || item.size === filters.size) &&
          (!filters.energy_level ||
            item.energy_level === filters.energy_level) &&
          (!filters.dependency_level ||
            item.dependency_level === filters.dependency_level) &&
          (!filters.energy_level ||
            item.energy_level === filters.energy_level) &&
          (!filters.environment || item.environment === filters.environment) &&
          (!filters.requirements ||
            item.requirements.includes(filters.requirements))
        )
      })
      .slice((page - 1) * 20, page * 20)

    return pets
  }
}

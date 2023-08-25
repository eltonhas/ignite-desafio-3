import { Pet, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { PetsRepository, filters } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findByNameAndOrganization(name: string, organizationId: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        name_organization_id: { name, organization_id: organizationId },
      },
    })

    return pet
  }

  async filterByOrganization(organizationId: string, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        organization_id: organizationId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
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

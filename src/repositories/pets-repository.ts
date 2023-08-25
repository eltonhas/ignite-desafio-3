import { AGE_OPTIONS, OPTIONS, Pet, Prisma } from '@prisma/client'

export interface filters {
  age?: AGE_OPTIONS | null
  size?: OPTIONS | null
  energy_level?: number | null
  dependency_level?: OPTIONS | null
  environment?: OPTIONS | null
  requirements?: string | null
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findByNameAndOrganization(
    name: string,
    organizationId: string,
  ): Promise<Pet | null>
  filterByOrganization(organizationId: string, page: number): Promise<Pet[]>
  filterByCharacteristics(
    petsByCity: Pet[],
    filters: filters,
    page: number,
  ): Promise<Pet[]>
}

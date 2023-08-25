import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repositories'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repositories'
import { FindPetsByCharacteristicsUseCase } from '../find-pets-by-characteristics'

export function makeFindPetsByCharacteristicsUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const petsRepository = new PrismaPetsRepository()
  const findPetsByCharacteristics = new FindPetsByCharacteristicsUseCase(
    organizationsRepository,
    petsRepository,
  )

  return findPetsByCharacteristics
}

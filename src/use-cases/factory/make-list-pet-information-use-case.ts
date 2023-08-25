import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repositories'
import { ListPetInformationsUseCase } from '../list-pet-informations'

export function makeListPetInformationsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const listPetInformationsUseCase = new ListPetInformationsUseCase(
    petsRepository,
  )

  return listPetInformationsUseCase
}

import { Pet } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'
import { RessourceNotFoundError } from './errors/ressource-not-found-error'

interface ListPetInformationsUseCaseRequest {
  id: string
}

interface ListPetInformationsUseCaseResponse {
  pet: Pet
}

export class ListPetInformationsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: ListPetInformationsUseCaseRequest): Promise<ListPetInformationsUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new RessourceNotFoundError()
    }

    return { pet }
  }
}

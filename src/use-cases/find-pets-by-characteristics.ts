import { Pet } from '@prisma/client'
import { PetsRepository, filters } from '../repositories/pets-repository'
import { RessourceNotFoundError } from './errors/ressource-not-found-error'
import { OrganizationsRepository } from '../repositories/organizations-repository'

interface FindPetsByCharacteristicsUseCaseRequest {
  city: string
  chosenFilters: filters
  page: number
}

interface FindPetsByCharacteristicsUseCaseResponse {
  pets: Pet[]
}

export class FindPetsByCharacteristicsUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    city,
    chosenFilters,
    page,
  }: FindPetsByCharacteristicsUseCaseRequest): Promise<FindPetsByCharacteristicsUseCaseResponse> {
    const organizations =
      await this.organizationsRepository.filterOrganizationsByCity(city, page)

    if (organizations.length === 0) {
      throw new RessourceNotFoundError()
    }

    const petsByCity: Pet[] = []

    for (let i = 0; i < organizations.length; i++) {
      const petListByOrganization =
        await this.petsRepository.filterByOrganization(
          organizations[i].id,
          page,
        )

      for (let x = 0; x < petListByOrganization.length; x++) {
        petsByCity.push(petListByOrganization[x])
      }
    }

    if (petsByCity.length === 0) {
      throw new RessourceNotFoundError()
    }

    if (Object.keys(chosenFilters).length === 0) {
      const pets = petsByCity

      return { pets }
    }

    const pets = await this.petsRepository.filterByCharacteristics(
      petsByCity,
      chosenFilters,
      page,
    )

    return { pets }
  }
}

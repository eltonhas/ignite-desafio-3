import { AGE_OPTIONS, OPTIONS, Pet } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { RessourceNotFoundError } from './errors/ressource-not-found-error'
import { RessourceNotAvailabelToUSeError } from './errors/ressource-not-available-to-use-error'

interface CreateAPetUseCaseRequest {
  name: string
  about: string | null
  age: AGE_OPTIONS
  size: OPTIONS
  energy_level: number
  dependency_level: OPTIONS
  environment: OPTIONS
  photo: string | null
  requirements: string
  organizationId: string
}

interface CreateAPetUseCaseResponse {
  pet: Pet
}

export class CreateAPetUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energy_level,
    dependency_level,
    environment,
    photo,
    requirements,
    organizationId,
  }: CreateAPetUseCaseRequest): Promise<CreateAPetUseCaseResponse> {
    const organization =
      await this.organizationsRepository.findById(organizationId)

    if (!organization) {
      throw new RessourceNotFoundError()
    }

    const alredyHaveThisPetNameInThisOrganization =
      await this.petsRepository.findByNameAndOrganization(name, organization.id)

    if (alredyHaveThisPetNameInThisOrganization) {
      throw new RessourceNotAvailabelToUSeError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level,
      dependency_level,
      environment,
      photo,
      requirements,
      organization_id: organization.id,
    })

    return { pet }
  }
}

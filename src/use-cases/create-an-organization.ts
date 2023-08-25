import { hash } from 'bcrypt'

import { Organization } from '@prisma/client'
import { OrganizationsRepository } from '../repositories/organizations-repository'
import { RessourceNotAvailabelToUSeError } from './errors/ressource-not-available-to-use-error'

interface CreateAnOrganizationUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
  cep: string
  address: string
  city: string
  state: string
}

interface CreateAnOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateAnOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    password,
    phone,
    cep,
    address,
    city,
    state,
  }: CreateAnOrganizationUseCaseRequest): Promise<CreateAnOrganizationUseCaseResponse> {
    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new RessourceNotAvailabelToUSeError()
    }

    const organizationWithSamePhone =
      await this.organizationsRepository.findByPhone(phone)

    if (organizationWithSamePhone) {
      throw new RessourceNotAvailabelToUSeError()
    }

    const organizationWithSameAddress =
      await this.organizationsRepository.findByAddress(address)

    if (organizationWithSameAddress) {
      throw new RessourceNotAvailabelToUSeError()
    }

    const password_hash = await hash(password, 6)

    const organization = await this.organizationsRepository.create({
      name,
      email,
      password_hash,
      phone,
      cep,
      address,
      city,
      state,
    })

    return { organization }
  }
}

import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repositories'
import { CreateAnOrganizationUseCase } from '../create-an-organization'

export function makeCreateAnOrganizationUseCase() {
  const organizationRepository = new PrismaOrganizationsRepository()
  const createAnOrganizationUseCase = new CreateAnOrganizationUseCase(
    organizationRepository,
  )

  return createAnOrganizationUseCase
}

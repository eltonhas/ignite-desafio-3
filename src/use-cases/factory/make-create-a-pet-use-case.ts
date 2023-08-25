import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repositories'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repositories'
import { CreateAPetUseCase } from '../create-a-pet'

export function makeCreateAPetUseCase() {
  const organizationRepository = new PrismaOrganizationsRepository()
  const petRepository = new PrismaPetsRepository()
  const createAPetUseCase = new CreateAPetUseCase(
    organizationRepository,
    petRepository,
  )

  return createAPetUseCase
}

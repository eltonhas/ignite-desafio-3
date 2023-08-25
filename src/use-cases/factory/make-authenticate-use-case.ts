import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repositories'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const athenticateUseCase = new AuthenticateUseCase(organizationsRepository)

  return athenticateUseCase
}

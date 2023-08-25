import { Prisma } from '@prisma/client'

import { OrganizationsRepository } from '../organizations-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return organization
  }

  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    return organization
  }

  async findByPhone(phone: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        phone,
      },
    })

    return organization
  }

  async findByAddress(address: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        address,
      },
    })

    return organization
  }

  async filterOrganizationsByCity(city: string, page: number) {
    const organizations = await prisma.organization.findMany({
      where: {
        city,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return organizations
  }
}

import { randomUUID } from 'node:crypto'

import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      phone: data.phone,
      cep: data.cep,
      address: data.address,
      city: data.city,
      state: data.state,
      created_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async findById(id: string) {
    const organization = this.items.find((item) => item.id === id)

    if (!organization) {
      return null
    }

    return organization
  }

  async findByPhone(phone: string) {
    const organization = this.items.find((item) => item.phone === phone)

    if (!organization) {
      return null
    }

    return organization
  }

  async findByAddress(address: string) {
    const organization = this.items.find((item) => item.address === address)

    if (!organization) {
      return null
    }

    return organization
  }

  async filterOrganizationsByCity(city: string, page: number) {
    return this.items
      .filter((item) => item.city === city)
      .slice((page - 1) * 20, page * 20)
  }
}

import { Organization, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
  findByEmail(email: string): Promise<Organization | null>
  findById(id: string): Promise<Organization | null>
  findByPhone(phone: string): Promise<Organization | null>
  findByAddress(address: string): Promise<Organization | null>
  filterOrganizationsByCity(city: string, page: number): Promise<Organization[]>
}

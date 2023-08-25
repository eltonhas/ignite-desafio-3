import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-alredy-exists-error'
import { makeCreateAnOrganizationUseCase } from '@/use-cases/factory/make-create-an-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string(),
    cep: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
  })

  const { name, email, password, phone, cep, address, city, state } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeCreateAnOrganizationUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
      phone,
      cep,
      address,
      city,
      state,
    })
  } catch (error) {
    if (error instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}

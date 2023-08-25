import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-alredy-exists-error'
import { makeCreateAPetUseCase } from '@/use-cases/factory/make-create-a-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    about: z.string().nullable(),
    age: z.enum(['CUB', 'ADULT', 'OLD']),
    size: z.enum(['P', 'M', 'G']),
    energy_level: z.number(),
    dependency_level: z.enum(['P', 'M', 'G']),
    environment: z.enum(['P', 'M', 'G']),
    photo: z.string().nullable(),
    requirements: z.string(),
  })

  const {
    name,
    about,
    age,
    size,
    energy_level,
    dependency_level,
    environment,
    photo,
    requirements,
  } = createBodySchema.parse(request.body)

  try {
    const registerUseCase = makeCreateAPetUseCase()

    await registerUseCase.execute({
      name,
      about,
      age,
      size,
      energy_level,
      dependency_level,
      environment,
      photo,
      requirements,
      organizationId: request.user.sub,
    })
  } catch (error) {
    if (error instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}

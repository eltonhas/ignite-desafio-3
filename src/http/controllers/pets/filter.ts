import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFindPetsByCharacteristicsUseCase } from '@/use-cases/factory/make-find-pets-by-characteristics-use-case'

export async function filter(request: FastifyRequest, reply: FastifyReply) {
  const filterQuerySchema = z.object({
    // chosenFilters: z.object({
    //   age: z.enum(['CUB', 'ADULT', 'OLD']).nullable(),
    //   size: z.enum(['P', 'M', 'G']).nullable(),
    //   energy_level: z.coerce.number().nullable(),
    //   dependency_level: z.enum(['P', 'M', 'G']).nullable(),
    //   environment: z.enum(['P', 'M', 'G']).nullable(),
    //   requirements: z.string().nullable(),
    // }),
    chosenFilters: z.string(),
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { city, chosenFilters, page } = filterQuerySchema.parse(request.query)

  const chosenFiltersParse = JSON.parse(chosenFilters)

  const findPetsByCharacteristicsUseCase =
    makeFindPetsByCharacteristicsUseCase()

  const { pets } = await findPetsByCharacteristicsUseCase.execute({
    city,
    chosenFilters: chosenFiltersParse,
    page,
  })

  return reply.status(200).send({ pets })
}

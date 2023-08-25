import { makeListPetInformationsUseCase } from '@/use-cases/factory/make-list-pet-information-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const profileParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = profileParamsSchema.parse(request.params)

  const listPetInformations = makeListPetInformationsUseCase()

  const { pet } = await listPetInformations.execute({ id })

  return reply.status(200).send({ pet })
}

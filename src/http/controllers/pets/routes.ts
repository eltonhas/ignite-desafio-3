import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { register } from './create'
import { filter } from './filter'
import { profile } from './profile'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/pets', register)

  app.get('/pets/filter', filter)
  app.get('/pets/:id', profile)
}

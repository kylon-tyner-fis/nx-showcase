import { FastifyInstance } from 'fastify';
import aiRoutes from './ai';

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async function () {
    return { message: 'Hello API' };
  });

  // fastify.register(aiRoutes, { prefix: '/ai' });
}

import { FastifyInstance } from 'fastify';
import sensiblePlugin from './plugins/sensible';
import rootRoutes from './routes/root';
import aiRoutes from './routes/ai';

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  // Register shared plugins explicitly so the load order is obvious
  fastify.register(sensiblePlugin, opts);

  // Register routes explicitly to avoid relying on filesystem autoloading
  fastify.register(rootRoutes, opts);
  fastify.register(aiRoutes, { prefix: '/ai', ...opts });
}

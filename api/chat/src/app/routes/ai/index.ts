import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
) {
  // Define a schema for validation (Fastify uses Ajv under the hood)
  const promptSchema = {
    body: {
      type: 'object',
      required: ['prompt'],
      properties: {
        prompt: { type: 'string', minLength: 1 },
      },
    },
  };

  fastify.post('/prompt', { schema: promptSchema }, async (request, reply) => {
    const { prompt } = request.body as { prompt: string };

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4o-mini',
      });

      return {
        success: true,
        data: completion.choices[0].message.content,
      };
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to fetch response from OpenAI',
      });
    }
  });
}

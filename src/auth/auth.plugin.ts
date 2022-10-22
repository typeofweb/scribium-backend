import fp from 'fastify-plugin';

import type { FastifyPluginCallback } from 'fastify';
import type { PrismaUser } from 'src/users/users.types';

declare module 'fastify' {
  interface FastifyRequest {
    user: PrismaUser;
  }
}

const authPlugin: FastifyPluginCallback = (fastify, _options, done) => {
  fastify.decorateRequest('user', null);

  done();
};

export default fp(authPlugin);

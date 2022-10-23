import fp from 'fastify-plugin';

import type { FastifyPluginCallback } from 'fastify';
import type { AppUser } from 'src/users/interfaces/app-user.interface';

declare module 'fastify' {
  interface FastifyRequest {
    user: AppUser;
  }
}

const authPlugin: FastifyPluginCallback = (fastify, _options, done) => {
  fastify.decorateRequest('user', null);

  done();
};

export default fp(authPlugin);

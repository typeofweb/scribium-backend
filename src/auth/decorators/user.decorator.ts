import { createParamDecorator } from '@nestjs/common';

import type { FastifyRequest } from 'fastify';
import type { ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();
    return request.user;
  },
);

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JsonWebTokenError } from 'jsonwebtoken';
import { AuthService } from './auth.service';

import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { AuthToken } from './interfaces/auth-token.interface';

const schemes = ['bearer'];

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const reply = ctx.getResponse<FastifyReply>();
    const roles = this.reflector.getAllAndMerge<string[]>('roles', [
      context.getClass(),
      context.getHandler(),
    ]);

    const authorization = request.headers.authorization || '';
    const [scheme, credentials] = authorization.split(' ');

    if (!authorization || !schemes.includes(scheme.toLowerCase())) {
      this.unauthorizedReply(reply);
    }

    try {
      const { id } = this.jwtService.verify<AuthToken>(credentials);

      request.user = await this.authService.authorize(id, roles);
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        this.unauthorizedReply(reply);
      }

      throw err;
    }

    return true;
  }

  private unauthorizedReply(reply: FastifyReply): never {
    reply.header('WWW-Authenticate', 'Bearer');
    throw new UnauthorizedException();
  }
}

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PRISMA_TOKEN } from 'src/prisma/prisma.module';

import type { User } from '@prisma/client';
import type { PrismaUser } from './users.types';

@Injectable()
export class UsersService {
  constructor(@Inject(PRISMA_TOKEN) private readonly prismaClient: PrismaClient) {}

  async getUserById(id: number): Promise<PrismaUser> {
    try {
      return await this.prismaClient.user.findUniqueOrThrow({ where: { id }, include: { details: true } });
    } catch (err) {
      throw new NotFoundException('Wrong id.');
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prismaClient.user.findUnique({ where: { email } });
  }
}

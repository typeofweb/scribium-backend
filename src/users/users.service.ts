import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PRISMA_TOKEN } from 'src/prisma/prisma.module';

import type { AppUser } from './interfaces/app-user.interface';

const include = { details: true } as const;

@Injectable()
export class UsersService {
  constructor(@Inject(PRISMA_TOKEN) private readonly prismaClient: PrismaClient) {}

  async getUserById(id: number): Promise<AppUser> {
    try {
      return await this.prismaClient.user.findUniqueOrThrow({ where: { id }, include });
    } catch (err) {
      throw new NotFoundException('User not found.');
    }
  }

  async getUserByEmail(email: string): Promise<AppUser | null> {
    return this.prismaClient.user.findUnique({ where: { email }, include });
  }
}

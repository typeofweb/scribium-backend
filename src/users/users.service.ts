import * as bcrypt from 'bcrypt';

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PRISMA_TOKEN } from 'src/prisma/prisma.module';

import type { CreateUserDto } from './dto/create-user.dto';
import type { AppUser } from './interfaces/app-user.interface';
import type { UpdateUserDto } from './dto/update-user.dto';

const include = { details: true } as const;

@Injectable()
export class UsersService {
  constructor(
    @Inject(PRISMA_TOKEN) private readonly prismaClient: PrismaClient,
  ) {}

  async getAllUsers(): Promise<AppUser[]> {
    return await this.prismaClient.user.findMany({ include });
  }

  async getUserById(id: number): Promise<AppUser> {
    try {
      return await this.prismaClient.user.findUniqueOrThrow({
        where: { id },
        include,
      });
    } catch (err) {
      throw new NotFoundException('User not found.');
    }
  }

  async getUserByEmail(email: string): Promise<AppUser | null> {
    return this.prismaClient.user.findUnique({ where: { email }, include });
  }

  async createUser({
    email,
    password,
    role,
    ...create
  }: CreateUserDto): Promise<AppUser> {
    return this.prismaClient.user.create({
      data: {
        email,
        password: await bcrypt.hash(password, 10),
        roles: [role],
        details: {
          create,
        },
      },
      include,
    });
  }

  async updateUser(
    id: number,
    { email, password, role, ...update }: UpdateUserDto,
  ): Promise<AppUser> {
    return await this.prismaClient.user.update({
      where: { id },
      data: {
        email,
        password: password && (await bcrypt.hash(password, 10)),
        roles: role && [role],
        details: {
          update,
        },
      },
      include,
    });
  }

  async deleteUser(id: number): Promise<AppUser> {
    return this.prismaClient.user.delete({ where: { id }, include });
  }
}

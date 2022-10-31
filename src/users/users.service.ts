import * as bcrypt from 'bcrypt';

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PRISMA_TOKEN } from 'src/prisma/prisma.module';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from 'src/app.types';

import type { CreateUserDto } from './dto/create-user.dto';
import type { AppUser } from './interfaces/app-user.interface';
import type { UpdateUserDto } from './dto/update-user.dto';
import type { PaginationDto } from 'src/common/pagination/pagination.dto';

const include = { details: true } as const;

@Injectable()
export class UsersService {
  constructor(
    @Inject(PRISMA_TOKEN) private readonly prismaClient: PrismaClient,
    @Inject(ConfigService) private readonly configService: AppConfigService,
  ) {}

  async getAllUsers({ limit, offset }: PaginationDto): Promise<AppUser[]> {
    return await this.prismaClient.user.findMany({
      include,
      take: limit,
      skip: offset,
    });
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
        password: await this.hashPassword(password),
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
        password: password && (await this.hashPassword(password)),
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

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.configService.get('SALT_OR_ROUNDS'));
  }
}

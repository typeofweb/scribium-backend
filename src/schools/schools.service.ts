import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PRISMA_TOKEN } from 'src/prisma/prisma.module';
import { SchoolNotFoundException } from './exceptions/school-not-found.exception';

import type { School } from '@prisma/client';
import type { CreateSchoolDto } from './dto/create-school.dto';
import type { UpdateSchoolDto } from './dto/update-school.dto';
import type { PaginationDto } from 'src/common/pagination/pagination.dto';

@Injectable()
export class SchoolsService {
  constructor(
    @Inject(PRISMA_TOKEN) private readonly prismaClient: PrismaClient,
  ) {}

  async getAllSchools({ limit, offset }: PaginationDto): Promise<School[]> {
    return await this.prismaClient.school.findMany({
      take: limit,
      skip: offset,
    });
  }

  async getSchoolById(id: number): Promise<School> {
    try {
      return await this.prismaClient.school.findUniqueOrThrow({
        where: { id },
      });
    } catch (err) {
      throw new SchoolNotFoundException();
    }
  }

  async getSchoolByUserId(userId: number): Promise<School> {
    try {
      return await this.prismaClient.school.findFirstOrThrow({
        where: {
          OR: [
            { students: { some: { userId } } },
            { teachers: { some: { userId } } },
          ],
        },
      });
    } catch (err) {
      throw new SchoolNotFoundException();
    }
  }

  async createSchool(createSchoolDto: CreateSchoolDto): Promise<School> {
    return await this.prismaClient.school.create({ data: createSchoolDto });
  }

  async updateSchool(
    id: number,
    updateSchoolDto: UpdateSchoolDto,
  ): Promise<School> {
    return await this.prismaClient.school.update({
      where: { id },
      data: updateSchoolDto,
    });
  }

  async deleteSchool(id: number): Promise<School> {
    return await this.prismaClient.school.delete({ where: { id } });
  }
}

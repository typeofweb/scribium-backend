import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PRISMA_TOKEN } from 'src/prisma/prisma.module';

import type { School } from '@prisma/client';
import type { CreateSchoolDto } from './dtos/create-school.dto';
import type { UpdateSchoolDto } from './dtos/update-school.dto';

@Injectable()
export class SchoolsService {
  constructor(@Inject(PRISMA_TOKEN) private readonly prismaClient: PrismaClient) {}

  async getAllSchools(): Promise<School[]> {
    return await this.prismaClient.school.findMany();
  }

  async getSchoolById(id: number): Promise<School> {
    try {
      return await this.prismaClient.school.findFirstOrThrow({ where: { id } });
    } catch (err) {
      throw new NotFoundException('Wrong id.');
    }
  }

  async createSchool(createSchoolDto: CreateSchoolDto): Promise<School> {
    return await this.prismaClient.school.create({ data: createSchoolDto });
  }

  async updateSchool(id: number, updateSchoolDto: UpdateSchoolDto): Promise<School> {
    return await this.prismaClient.school.update({ where: { id }, data: updateSchoolDto });
  }

  async deleteSchool(id: number): Promise<School> {
    return await this.prismaClient.school.delete({ where: { id } });
  }
}

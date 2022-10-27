import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PRISMA_TOKEN } from 'src/prisma/prisma.module';

import type { Student } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(
    @Inject(PRISMA_TOKEN) private readonly prismaClient: PrismaClient,
  ) {}

  async getStudentById(id: number): Promise<Student> {
    try {
      return await this.prismaClient.student.findUniqueOrThrow({
        where: { id },
      });
    } catch (err) {
      throw new NotFoundException('Student not found.');
    }
  }
}

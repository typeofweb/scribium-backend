import { Injectable } from '@nestjs/common';

import type { School as PrismaSchool } from '@prisma/client';
import type { School } from './interfaces/school.interface';

@Injectable()
export class SchoolsMapper {
  map({ id, name }: PrismaSchool): School {
    return { id, name };
  }

  mapAsArray(schools: PrismaSchool[]): School[] {
    return schools.map(this.map);
  }
}

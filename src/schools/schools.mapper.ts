import { Injectable } from '@nestjs/common';

import type { School } from '@prisma/client';
import type { SchoolDto } from './dtos/school.dto';

@Injectable()
export class SchoolsMapper {
  map({ id, name }: School): SchoolDto {
    return { id, name };
  }

  mapAsArray(schools: School[]): SchoolDto[] {
    return schools.map(this.map);
  }
}

import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SchoolsService } from 'src/schools/schools.service';

import type { School } from '@prisma/client';

@Controller('students')
export class StudentsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Get(':id/school')
  getStudentSchool(@Param('id', ParseIntPipe) id: number): Promise<School> {
    return this.schoolsService.getSchoolByStudentId(id);
  }
}

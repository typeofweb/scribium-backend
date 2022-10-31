import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Pagination } from 'src/common/pagination/pagination.decorator';
import { PaginationDto } from 'src/common/pagination/pagination.dto';

import type { School } from '@prisma/client';

@Auth('ADMIN')
@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Get()
  async getAllSchools(
    @Pagination() pagination: PaginationDto,
  ): Promise<School[]> {
    return await this.schoolsService.getAllSchools(pagination);
  }

  @Get(':id')
  async getSchoolById(@Param('id', ParseIntPipe) id: number): Promise<School> {
    return await this.schoolsService.getSchoolById(id);
  }

  @Post()
  async createSchool(
    @Body() createSchoolDto: CreateSchoolDto,
  ): Promise<School> {
    return await this.schoolsService.createSchool(createSchoolDto);
  }

  @Patch(':id')
  async updateSchool(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true }))
    updateSchoolDto: UpdateSchoolDto,
  ): Promise<School> {
    return await this.schoolsService.updateSchool(id, updateSchoolDto);
  }

  @Delete(':id')
  async deleteSchool(@Param('id', ParseIntPipe) id: number): Promise<School> {
    return await this.schoolsService.deleteSchool(id);
  }
}

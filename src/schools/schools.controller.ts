import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { SchoolsMapper } from './schools.mapper';
import { SchoolsService } from './schools.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

import type { School } from './interfaces/school.interface';

// TODO: SECURE ENDPOINTS
@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService, private readonly schoolsMapper: SchoolsMapper) {}

  @Get()
  async getAllSchools(): Promise<School[]> {
    return this.schoolsMapper.mapAsArray(await this.schoolsService.getAllSchools());
  }

  @Get(':id')
  async getSchool(@Param('id', ParseIntPipe) id: number): Promise<School> {
    return this.schoolsMapper.map(await this.schoolsService.getSchoolById(id));
  }

  @Post()
  async createSchool(@Body() createSchoolDto: CreateSchoolDto): Promise<School> {
    return this.schoolsMapper.map(await this.schoolsService.createSchool(createSchoolDto));
  }

  @Patch(':id')
  async updateSchool(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true })) updateSchoolDto: UpdateSchoolDto,
  ): Promise<School> {
    return this.schoolsMapper.map(await this.schoolsService.updateSchool(id, updateSchoolDto));
  }

  @Delete(':id')
  async deleteSchool(@Param('id', ParseIntPipe) id: number): Promise<School> {
    return this.schoolsMapper.map(await this.schoolsService.deleteSchool(id));
  }
}

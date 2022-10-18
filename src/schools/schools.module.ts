import { Module } from '@nestjs/common';
import { SchoolsController } from './schools.controller';
import { SchoolsMapper } from './schools.mapper';
import { SchoolsService } from './schools.service';

@Module({
  controllers: [SchoolsController],
  providers: [SchoolsService, SchoolsMapper],
})
export class SchoolsModule {}

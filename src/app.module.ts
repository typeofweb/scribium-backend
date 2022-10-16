import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SchoolsModule } from './schools/schools.module';

@Module({
  imports: [PrismaModule, SchoolsModule],
})
export class AppModule {}

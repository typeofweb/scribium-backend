import { Module } from '@nestjs/common';
import { SchoolsModule } from 'src/schools/schools.module';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [SchoolsModule],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}

import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SchoolsModule } from './schools/schools.module';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    SchoolsModule,
    UsersModule,
    StudentsModule,
  ],
})
export class AppModule {}

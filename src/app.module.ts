import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SchoolsModule } from './schools/schools.module';
import { MeModule } from './me/me.module';

@Module({
  imports: [PrismaModule, AuthModule, SchoolsModule, MeModule],
})
export class AppModule {}

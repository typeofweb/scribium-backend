import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from './jwt/jwt.module';
import { SchoolsModule } from './schools/schools.module';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [PrismaModule, JwtModule, SchoolsModule, UsersModule, SessionsModule],
})
export class AppModule {}

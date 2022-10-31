import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SchoolsModule } from './schools/schools.module';
import { MeModule } from './me/me.module';
import { UsersModule } from './users/users.module';
import { CONFIG_SCHEMA } from './app.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (data) => CONFIG_SCHEMA.validateSync(data),
    }),
    PrismaModule,
    AuthModule,
    SchoolsModule,
    MeModule,
    UsersModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { SchoolsModule } from 'src/schools/schools.module';
import { UsersModule } from 'src/users/users.module';
import { MeController } from './me.controller';

@Module({
  imports: [AuthModule, UsersModule, SchoolsModule],
  controllers: [MeController],
})
export class MeModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersMapper } from './users.mapper';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersMapper],
  exports: [UsersService, UsersMapper],
})
export class UsersModule {}

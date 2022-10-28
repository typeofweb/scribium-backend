import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersMapper } from './users.mapper';

@Module({
  providers: [UsersService, UsersMapper],
  exports: [UsersService, UsersMapper],
})
export class UsersModule {}

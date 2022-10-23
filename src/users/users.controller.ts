import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { UsersMapper } from './users.mapper';
import { UserDto } from './dto/user.dto';
import { AppUser } from './interfaces/app-user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersMapper: UsersMapper) {}

  @Get('me')
  @UseGuards(AuthGuard)
  getMeUser(@User() user: AppUser): UserDto {
    return this.usersMapper.mapUserToUserDto(user);
  }
}

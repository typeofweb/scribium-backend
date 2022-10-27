import { Controller, Get } from '@nestjs/common';
import { User } from '../auth/decorators/user.decorator';
import { UsersMapper } from './users.mapper';
import { UserDto } from './dto/user.dto';
import { AppUser } from './interfaces/app-user.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersMapper: UsersMapper) {}

  @Get('me')
  @Auth()
  getMeUser(@User() user: AppUser): UserDto {
    return this.usersMapper.mapUserToUserDto(user);
  }
}

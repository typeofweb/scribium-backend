import { Controller, Get } from '@nestjs/common';
import { User } from 'src/auth/decorators/user.decorator';
import { UserDto } from 'src/users/dto/user.dto';
import { AppUser } from 'src/users/interfaces/app-user.interface';
import { UsersMapper } from 'src/users/users.mapper';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { SchoolsService } from 'src/schools/schools.service';

import type { School } from '@prisma/client';

@Auth()
@Controller('me')
export class MeController {
  constructor(
    private readonly usersMapper: UsersMapper,
    private readonly schoolsService: SchoolsService,
  ) {}

  @Get()
  getMeUser(@User() user: AppUser): UserDto {
    return this.usersMapper.mapUserToUserDto(user);
  }

  @Get('schools')
  getMeSchool(@User() { id }: AppUser): Promise<School> {
    return this.schoolsService.getSchoolByUserId(id);
  }
}

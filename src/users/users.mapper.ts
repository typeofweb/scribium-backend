import { Injectable } from '@nestjs/common';

import type { UserDto } from './dto/user.dto';
import type { AppUser } from './interfaces/app-user.interface';

@Injectable()
export class UsersMapper {
  mapUserToUserDto({ id, email, roles, details }: AppUser): UserDto {
    const { firstName, lastName, address, phone } = details || {};

    return {
      id,
      email,
      roles,
      details: { firstName, lastName, address, phone },
    };
  }

  mapUsersToUsersDto(users: AppUser[]): UserDto[] {
    return users.map(this.mapUserToUserDto);
  }
}

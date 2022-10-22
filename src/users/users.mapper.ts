import { Injectable } from '@nestjs/common';

import type { AppUser } from './interfaces/app-user.interface';
import type { PrismaUser } from './users.types';

@Injectable()
export class UsersMapper {
  mapPrismaUserToAppUser({ id, email, roles, details: { firstName, lastName, address } }: PrismaUser): AppUser {
    return { id, email, roles, details: { firstName, lastName, address } };
  }
}

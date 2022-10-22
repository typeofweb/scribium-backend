import * as bcrypt from 'bcrypt';

import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import type { AppUser } from 'src/users/users.types';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async authenticate(email: string, password: string): Promise<AppUser> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new NotFoundException('Incorrect email or password.');
    }

    return user;
  }

  async authorize(userId: number, roles: string[]): Promise<AppUser> {
    const user = await this.usersService.getUserById(userId);

    if (roles.length && !user.roles.find((role) => roles.includes(role))) {
      throw new ForbiddenException();
    }

    return user;
  }
}

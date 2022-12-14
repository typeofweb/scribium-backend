import * as bcrypt from 'bcrypt';

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import type { AuthRequestDto } from './dto/auth-request.dto';
import type { AuthResponseDto } from './dto/auth-response.dto';
import type { AppUser } from 'src/users/interfaces/app-user.interface';
import type { AuthToken } from './interfaces/auth-token.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: AuthRequestDto): Promise<AuthResponseDto> {
    const { id } = await this.authenticate(email, password);
    const token = await this.jwtService.signAsync({ id } as AuthToken);

    return { token };
  }

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

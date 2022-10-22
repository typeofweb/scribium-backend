import { Controller, Post, Get, Delete, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionsService } from './sessions.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersMapper } from 'src/users/users.mapper';
import { AppUser } from 'src/users/interfaces/app-user.interface';
import { User } from 'src/auth/decorators/user.decorator';
import { PrismaUser } from 'src/users/users.types';

import type { Session } from './interfaces/session.interface';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService, private readonly usersMapper: UsersMapper) {}

  @Get('me')
  @UseGuards(AuthGuard)
  getSession(@User() user: PrismaUser): AppUser {
    return this.usersMapper.mapPrismaUserToAppUser(user);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  createSession(@Body() createSessionDto: CreateSessionDto): Promise<Session> {
    return this.sessionsService.createSession(createSessionDto);
  }

  @Delete()
  deleteToken() {
    return ''; // TODO: LOGOUT
  }
}

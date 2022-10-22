import { Controller, Post, Get, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionsService } from './sessions.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersMapper } from 'src/users/users.mapper';
import { User } from 'src/auth/decorators/user.decorator';
import { AppUser } from 'src/users/users.types';
import { UserDto } from 'src/users/dto/user.dto';

import type { SessionDto } from './dto/session.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService, private readonly usersMapper: UsersMapper) {}

  @Get('me')
  @UseGuards(AuthGuard)
  getSession(@User() user: AppUser): UserDto {
    return this.usersMapper.mapUserToUserDto(user);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  createSession(@Body() createSessionDto: CreateSessionDto): Promise<SessionDto> {
    return this.sessionsService.createSession(createSessionDto);
  }
}

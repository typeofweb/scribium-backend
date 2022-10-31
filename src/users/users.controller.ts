import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UsersMapper } from './users.mapper';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Pagination } from 'src/common/pagination/pagination.decorator';
import { PaginationDto } from 'src/common/pagination/pagination.dto';

import type { UserDto } from './dto/user.dto';

@Auth('ADMIN')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersMapper: UsersMapper,
  ) {}

  @Get()
  async getAllUsers(
    @Pagination() pagination: PaginationDto,
  ): Promise<UserDto[]> {
    return this.usersMapper.mapUsersToUsersDto(
      await this.usersService.getAllUsers(pagination),
    );
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.usersMapper.mapUserToUserDto(
      await this.usersService.getUserById(id),
    );
  }

  @Post()
  async createUser(
    @Body(new ValidationPipe({ whitelist: true })) createUserDto: CreateUserDto,
  ): Promise<UserDto> {
    return this.usersMapper.mapUserToUserDto(
      await this.usersService.createUser(createUserDto),
    );
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true }))
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.usersMapper.mapUserToUserDto(
      await this.usersService.updateUser(id, updateUserDto),
    );
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.usersMapper.mapUserToUserDto(
      await this.usersService.deleteUser(id),
    );
  }
}

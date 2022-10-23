import { Controller, HttpCode, HttpStatus, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth-request.dto';
import { AuthGuard } from './auth.guard';

import type { AuthResponseDto } from './dto/auth-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authRequestDto: AuthRequestDto): Promise<AuthResponseDto> {
    return this.authService.login(authRequestDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  logout(): string {
    // TODO: PUT TOKEN INTO REDIS
    return '';
  }
}

import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from 'src/jwt/jwt.service';

import type { CreateSessionDto } from './dto/create-session.dto';
import type { Session } from './interfaces/session.interface';
import type { Token } from './interfaces/token.interface';

@Injectable()
export class SessionsService {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

  async createSession({ email, password }: CreateSessionDto): Promise<Session> {
    const { id } = await this.authService.authenticate(email, password);
    const token = this.jwtService.sign<Token>({ id });

    return { token };
  }
}

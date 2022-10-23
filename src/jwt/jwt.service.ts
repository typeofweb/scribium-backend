import * as jwt from 'jsonwebtoken';

import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtService {
  sign<T extends object | string | Buffer>(payload: T, options?: jwt.SignOptions): string {
    return jwt.sign(payload, 'SECRET', options); // TODO: ADD SECRET CONFIGURATION
  }

  verify<T>(token: string, options?: jwt.VerifyOptions): T {
    return jwt.verify(token, 'SECRET', options) as T;
  }
}

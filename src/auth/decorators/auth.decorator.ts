import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';

import type { Role } from '@prisma/client';

export const Auth = (...roles: Role[]) =>
  applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard));

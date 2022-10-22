import type { User, UserDetails } from '@prisma/client';

export type AppUser = User & { details: UserDetails };

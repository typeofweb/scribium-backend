import type { User, UserDetails } from '@prisma/client';

export type PrismaUser = User & { details: UserDetails };

import type { Role } from '@prisma/client';

export interface AppUser {
  id: number;
  email: string;
  roles: Role[];
  details: {
    firstName: string;
    lastName: string;
    address: string;
  };
}

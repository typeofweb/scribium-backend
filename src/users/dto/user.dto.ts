import type { Role } from '@prisma/client';

export class UserDto {
  id: number;
  email: string;
  roles: Role[];
  details: {
    firstName: string;
    lastName: string;
    address: string;
  };
}

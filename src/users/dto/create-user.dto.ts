import { Role } from '@prisma/client';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { PASSWORD_REGEX } from 'src/app.constants';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Matches(PASSWORD_REGEX, {
    message: 'password can be 6 to 20 characters long.',
  })
  password: string;

  @IsIn(Object.keys(Role))
  role: keyof typeof Role;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsString()
  @Length(9, 9)
  phone: string;
}

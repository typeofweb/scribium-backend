import { IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { PASSWORD_ERROR_MESSAGE, PASSWORD_REGEX } from 'src/app.constants';

export class AuthRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(PASSWORD_REGEX, {
    message: PASSWORD_ERROR_MESSAGE,
  })
  password: string;
}

import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  username: string;
  @Length(8, 25)
  password: string;
}

import { Length } from 'class-validator';

export class LoginDto {
  username: string;

  @Length(8, 25)
  password: string;
}

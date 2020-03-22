import { Injectable } from '@nestjs/common';
import { UsersService, User } from '../users';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOne(username);
    if (user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}

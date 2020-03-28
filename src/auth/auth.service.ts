import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService, User } from '../users';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { omit } from 'lodash';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'hash'> | null> {
    try {
      const user = await this.usersService.findOne({ username });
      if (!user) throw new Error('User does not exist');
      let isValidPassword;
      try {
        isValidPassword = await compare(password, user.hash);
        if (!isValidPassword) throw new Error('User does not exist');
      } catch (e) {
        throw new UnauthorizedException();
      }

      return omit(user, 'hash');
    } catch (error) {
      return null;
    }
  }

  async logIn(user: LoginDto) {
    try {
      const validatedUser = await this.validateUser(
        user.username,
        user.password,
      );
      if (!validatedUser) throw new Error('Invalid user');
      return { accessToken: this.jwtService.sign({ username: user.username }) };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async signToken(username: string): Promise<string> {
    return this.jwtService.sign({ username });
  }

  async decodeToken(accessToken: string): Promise<{ username: string }> {
    const payload = this.jwtService.decode(accessToken);
    if (typeof payload === 'string') return { username: payload };
    if (payload?.username) return { username: payload.username };
    return { username: '' };
  }
}

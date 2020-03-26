import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService, User } from '../users';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
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
    const user = await this.usersService.findOneByUsername(username);
    if (!user) return null;
    let isValidPassword;
    try {
      isValidPassword = await compare(password, user.hash);
    } catch (e) {
      console.log('bcrypt', e); // FIXME: add error handling
    }

    if (isValidPassword) {
      const { hash, ...result } = user;
      return result;
    }
    return null;
  }

  async logIn(user: LoginDto) {
    const validatedUser = await this.validateUser(user.username, user.password);
    if (validatedUser) {
      const payload = { username: user.username };
      return { accessToken: this.jwtService.sign(payload) };
    }
    throw new UnauthorizedException();
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

import { Resolver, Query, Args } from '@nestjs/graphql';
import { UsersService } from '../users';
import { User } from '../users';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthSuccess } from '../graphql';
import { LoginDto } from './dto/login.dto';

@Resolver()
export class AuthResolver {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query()
  async user(
    @Args('input') input: { username: string; accessToken: string },
  ): Promise<User | null> {
    return this.usersService.findOne({ username: input.username });
  }

  @Query()
  logIn(@Args('input') input: LoginDto): Promise<AuthSuccess> {
    return this.authService.logIn(input);
  }
}

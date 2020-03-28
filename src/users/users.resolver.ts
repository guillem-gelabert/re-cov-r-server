import { UsersService } from './users.service';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthSuccess } from '../graphql';
import { AuthService } from '../auth';
import {
  UseGuards,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from './currentUser.decorator';
import { User } from './interfaces';

@Resolver()
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Query()
  @UseGuards(JwtAuthGuard)
  async whoAmI(@CurrentUser() user: User): Promise<User> {
    try {
      const currentUser = await this.usersService.findOne(user);
      if (!currentUser) throw new Error('Authentication Error');
      return currentUser;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Mutation()
  async createUser(@Args('input') input: CreateUserDto): Promise<AuthSuccess> {
    try {
      const user = await this.usersService.create(input);
      let accessToken = '';
      if (user) {
        accessToken = await this.authService.signToken(user.username);
      }
      return { accessToken };
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }
}

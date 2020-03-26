import { UsersService } from './users.service';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthSuccess } from '../graphql';
import { AuthService } from '../auth';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Query()
  @UseGuards(JwtAuthGuard)
  async getUserDetails(
    @Args('input') input: string,
  ): Promise<{ username: string }> {
    return { username: input };
  }

  @Mutation()
  async createUser(@Args('input') input: CreateUserDto): Promise<AuthSuccess> {
    const user = await this.usersService.create(input);
    let accessToken = '';
    if (user) {
      accessToken = await this.authService.signToken(user.username);
    }
    return { accessToken };
  }
}

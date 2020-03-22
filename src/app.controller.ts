import {
  Controller,
  Post,
  Request as RequestDecorator,
  Get,
  UseGuards,
  Body,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { Request } from 'express';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Get(':username')
  // findOne(@Param('username') username: User['username']): Promise<User> {
  //   return this.usersService.findOne(username);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@RequestDecorator() req: Request) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@RequestDecorator() req: Request) {
    return this.authService.login(req.user as any);
  }
}

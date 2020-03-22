import {
  Controller,
  Request as RequestDecorator,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@RequestDecorator() req: Request) {
    return req.user;
  }
}

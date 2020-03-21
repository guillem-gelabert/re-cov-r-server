import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return `user ${createUserDto.username} add successfully`;
  }

  @Get(':id')
  findOne(@Param() params: { id: string }): string {
    return `you are looking for user ${params.id}`;
  }
}

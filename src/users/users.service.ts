import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_MODEL } from './constants';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(USER_MODEL) private userModel: Model<User & Document>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User & Document> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = {
        email: createUserDto.email,
        username: createUserDto.username,
        hash: hashedPassword,
      };
      const createdUser = new this.userModel(newUser);
      return createdUser.save();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOne(user: Partial<CreateUserDto>): Promise<User | null> {
    return this.userModel.findOne({ username: user.username }).lean();
  }
}

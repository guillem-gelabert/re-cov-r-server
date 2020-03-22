import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { getModelToken } from '@nestjs/mongoose';
import { USER_MODEL } from './constants';

const userModel = {
  username: 'mock_user',
  email: 'mock_mail@mock_provider.com',
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken(USER_MODEL),
          useValue: userModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

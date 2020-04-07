import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MONGO_CONNECTION_STRING } from './constants';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get(MONGO_CONNECTION_STRING),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      playground: true,
      typePaths: ['./**/*.graphql'],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(process.cwd(), '.dev.env'),
        join(process.cwd(), '.env'),
      ],
    }),
  ],
})
export class AppModule {}

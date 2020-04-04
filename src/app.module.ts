import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost/nest',
    ),
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
  ],
})
export class AppModule {}


/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class LogInInput {
    username: string;
    password: string;
}

export class SignInInput {
    username: string;
    password: string;
    email: string;
}

export class AuthSuccess {
    accessToken: string;
}

export abstract class IMutation {
    abstract createUser(input?: SignInInput): AuthSuccess | Promise<AuthSuccess>;
}

export abstract class IQuery {
    abstract logIn(input?: LogInInput): AuthSuccess | Promise<AuthSuccess>;

    abstract user(input?: LogInInput): User | Promise<User>;

    abstract getUserDetails(input?: string): UserResponse | Promise<UserResponse>;

    abstract whoAmI(): User | Promise<User>;
}

export class User {
    email: string;
    username: string;
    password: string;
}

export class UserResponse {
    username?: string;
}

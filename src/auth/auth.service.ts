import { Injectable, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { IAuthenticate, Role } from './interface/role';
import { AuthenticateDto } from './dto/authenticate.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  users = [
    {
      id: faker.datatype.uuid(),
      username: 'Islam Elbadawy',
      password: '123456789',
      role: Role.Admin,
    },
    {
      id: faker.datatype.uuid(),
      username: 'sarah Elbadawy',
      password: '123456789',
      role: Role.User,
    },
  ];

  authenticate(authenticateDto: AuthenticateDto): IAuthenticate {
    const user = this.users.find(
      (u) =>
        u.username === authenticateDto.username &&
        u.password === authenticateDto.password,
    );

    if (!user) throw new NotFoundException('Invalid credentials');

    const token = sign({ ...user }, 'secret');

    return { token, user };
  }
}

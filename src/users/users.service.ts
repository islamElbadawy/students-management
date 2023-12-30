import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { User } from 'src/Users/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });

    if (user.password !== pass) {
      throw new NotFoundException('Invalid credentials');
    }

    const token = sign({ ...user }, 'secret');
    return { token, user };
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
}

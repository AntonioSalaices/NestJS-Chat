import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';
import { User } from './user.entity';
import CreateUserDto from './create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const createdUser: User = await this.usersRepository.save(user);

    return createdUser;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: ObjectId): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: ObjectId): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

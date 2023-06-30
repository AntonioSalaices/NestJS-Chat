import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId as ObjectIdType, Repository } from 'typeorm';
import { User } from './user.entity';
import CreateUserDto from './create-user.dto';
import { ObjectId } from 'mongodb';
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

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });

    if (user) {
      return user;
    }

    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: ObjectIdType) {
    const user = await this.usersRepository.findOne({
      where: { _id: new ObjectId(id) },
    } as any);

    if (user) {
      return user;
    }

    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async remove(id: ObjectId): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

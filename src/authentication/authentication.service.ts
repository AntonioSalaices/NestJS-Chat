import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import RegisterUserDto from './register-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}

  async create(registrationData: RegisterUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(registrationData.password, 10);
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });

      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

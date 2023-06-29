import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Get,
} from '@nestjs/common';
import CreateUserDto from './create-user.dto';
import { UsersService } from './users.service';
import { Error } from '../utils/errors';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  @HttpCode(204)
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    try {
      await this.usersService.create(createUserDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: Error.ambiguous,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }
}

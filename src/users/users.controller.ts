import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { Error } from '../utils/errors';

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
}

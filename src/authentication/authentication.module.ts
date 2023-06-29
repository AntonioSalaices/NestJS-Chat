import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UsersModule } from '../users/users.module';
import { AuthenticationController } from './authentication.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
  providers: [AuthenticationService, UsersService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}

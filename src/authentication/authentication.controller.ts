import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthenticationService } from './authentication.service';
import RegisterUserDto from './register-user.dto';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}
  @Post('register')
  @HttpCode(204)
  async create(
    @Body() RegisterUserDto: RegisterUserDto,
  ): Promise<RegisterUserDto> {
    return await this.authenticationService.create(RegisterUserDto);
  }
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}

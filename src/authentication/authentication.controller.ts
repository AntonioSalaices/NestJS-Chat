import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { AuthenticationService } from './authentication.service';
import RegisterUserDto from './register-user.dto';

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
}

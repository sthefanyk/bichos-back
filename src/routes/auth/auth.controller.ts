import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ForgetAuthDto } from './dto/forget-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ResetAuthDto } from './dto/reset-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginAuthDto) {
    return this.authService.login(body);
  }

  @Post('register')
  register(@Body() body: RegisterAuthDto) {
    return this.authService.register(body);
  }

  @Post('forget')
  forget(@Body() body: ForgetAuthDto) {
    return this.authService.forget(body);
  }

  @Post('reset')
  reset(@Body() body: ResetAuthDto) {
    return this.authService.reset(body);
  }

  @Post('me')
  me(@Body() body) {
    return this.authService.me(body.token);
  }
}

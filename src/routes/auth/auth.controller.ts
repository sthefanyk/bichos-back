import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ForgetAuthDto } from './dto/forget-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ResetAuthDto } from './dto/reset-auth.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Token } from 'src/decorators/token.decorator';
import { TokenGuard } from 'src/guards/token.guard';

@ApiTags('auth')
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

  @UseGuards(TokenGuard)
  @Post('reset')
  reset(@Body() body: {password: string}, @Token() token) {
    return this.authService.reset({password: body.password, token});
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@User() user) {
    return { user };
  }
}

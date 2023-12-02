import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ForgetAuthDto } from './dto/forget-auth.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { User } from '../../decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Token } from '../../decorators/token.decorator';
import { TokenGuard } from '../../guards/token.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginAuthDto) {
    return this.authService.login(body);
  }

  @Post('forget')
  forget(@Body() body: ForgetAuthDto) {
    return this.authService.forget(body);
  }

  @UseGuards(TokenGuard)
  @Post('reset')
  reset(@Body() body: { password: string }, @Token() token) {
    return this.authService.reset({ password: body.password, token });
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@User() user) {
    return { user };
  }
}

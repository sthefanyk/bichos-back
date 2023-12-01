import { Injectable, Inject } from '@nestjs/common';

import { ForgetAuthDto } from './dto/forget-auth.dto';
import { AuthService as Service } from 'src/@core/application/services/auth/auth.service';
import { ResetAuthDto } from './dto/reset-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {

  @Inject(Service)
  private service: Service;

  constructor(
    private readonly mailer: MailerService
  ){}

  async login({email, password}: LoginAuthDto) {
    return this.service.singIn(email, password);
  }

  async forget({ email }: ForgetAuthDto) {
    const result = await this.service.forget(email);
    await this.mailer.sendMail({
      subject: 'Forget Password',
      to: 'sthe@email.com',
      template: './forget.handlebars',
      context: {
        username: result.username
      }
    });
  }

  async reset({ token, password }: ResetAuthDto) {
    return this.service.reset(token, password);
  }

  async me(token: string) {
    return this.service.me(token);
  }
}

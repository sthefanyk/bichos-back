// import { Injectable, Inject } from '@nestjs/common';

// import { ForgetAuthDto } from './dto/forget-auth.dto';
// import { AuthService as Service } from 'src/@core/application/services/auth/auth.service';
// import { ResetAuthDto } from './dto/reset-auth.dto';
// import { LoginAuthDto } from './dto/login-auth.dto';
// import { RegisterAuthDto } from './dto/register-auth.dto';
// import { UsersService } from '../users/users.service';

// @Injectable()
// export class AuthService {

//   constructor(private readonly usersService: UsersService){}

//   @Inject(Service)
//   private service: Service;

//   async login({email, password}: LoginAuthDto) {
//     return this.service.singIn(email, password);
//   }

//   async forget({ email }: ForgetAuthDto) {
//     return this.service.forget(email);
//   }

//   async reset({ token, password }: ResetAuthDto) {
//     return this.service.reset(token, password);
//   }

//   async me(token: string) {
//     return this.service.me(token);
//   }

//   async register(data: RegisterAuthDto) {
//     const id = await this.usersService.create(data);
//     return this.service.register(id);
//   }
// }

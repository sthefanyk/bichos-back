// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { AuthService } from 'src/@core/application/services/auth/auth.service';
// import { UsersService } from 'src/routes/users/users.service';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly usersService: UsersService,
//   ) {}

//   async canActivate(context: ExecutionContext) {
//     const request = context.switchToHttp().getRequest();

//     const { authorization } = request.headers;

//     try {
//       const data = this.authService.checkTokenUser(
//         String(authorization ?? '').split(' ')[1],
//       );

//       request.tokenPayload = data;

//       request.user = await this.usersService.findOne(data.sub as any);

//       return true;
//     } catch (error) {
//       return false;
//     }
//   }
// }

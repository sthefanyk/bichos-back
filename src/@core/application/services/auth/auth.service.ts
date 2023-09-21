// import { IAuth } from "./auth.interface";
// import IUserRepository from "src/@core/domain/contracts/user-repository.interface";
// import * as jwt from 'jsonwebtoken';
// import UserModel from "src/@core/domain/models/person.model";

// export class AuthService implements IAuth {
//     constructor(private repo: IUserRepository){}

//     createToken(user: UserModel, time: string) {
//         const token = jwt.sign({
//             name: user.name,
//             email: user.email
//         },
//         process.env.JWT_SECRET,
//         {
//             expiresIn: time,
//             subject: user.id,
//             issuer: 'API Bichos',
//             audience: 'users'   
//         });

//         return { accessToken: token }
//     }

//     checkTokenUser(token: string) {
//         try {
//             const data = jwt.verify(token, process.env.JWT_SECRET, {
//                 audience: 'users',
//                 issuer: 'API Bichos'
//             });
    
//             return data
//         } catch (error) {
//             throw new Error(error);
//         }
        
//     }

//     isValidToken(token: string) {
//         try {
//             this.checkTokenUser(token);
//             return true;
//         } catch (error) {
//             return false;
//         }
//     }

//     async singIn(email: string, password: string): Promise<{ accessToken: string }> {
//         const user = await this.repo.findByEmail(email);

//         if (! await user.getEntity(user).verifyPassword(password)) {
//             throw new Error('Email and/or password are incorrect');
//         }

//         return await this.createToken(user, "7d");
//     }

//     async forget(email: string): Promise<object> {
//         const user = await this.repo.findByEmail(email);

//         return user;
//     }

//     async reset(token: string, password: string): Promise<{ accessToken: string }> {
//         const { sub } = this.checkTokenUser(token);

//         const user = await this.repo.resetPassword(sub.toString(), password);

//         return this.createToken(user, "30min");
//     }

//     async me(token: string) {
//         return this.checkTokenUser(token);
//     }

//     async register(id: string): Promise<{ accessToken: string }> {
//         const entity = await this.repo.findById(id);
//         const model = await this.repo.findByEmail(entity.get('email'));
//         return this.createToken(model, "7days");
//     }
// }
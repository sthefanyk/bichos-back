import { IAuth } from "./auth.interface";
import IUserRepository from "src/@core/domain/contracts/user-repository.interface";
import * as jwt from 'jsonwebtoken';
import UserModel from "src/@core/domain/models/user.model";

export class AuthService implements IAuth {
    constructor(private repo: IUserRepository){}

    createToken(user: UserModel, time: string) {
        return jwt.sign({
            name: user.name,
            email: user.email
        },
        "[+J5l5gSuXKDtl6c7}FgfN=qY2%tk£r@",
        {
            expiresIn: time,
            subject: user.id,
            issuer: 'API Bichos',
            audience: 'users'   
        });
    }

    checkTokenUser(token: string) { 
        const data = jwt.verify(token, "[+J5l5gSuXKDtl6c7}FgfN=qY2%tk£r@", {
            audience: 'users',
            issuer: 'API Bichos'
        });

        console.log(data);

        return data
    }

    async singIn(email: string, password: string): Promise<string> {
        const user = await this.repo.findByEmailAndPassword(email, password);
        return await this.createToken(user, "7d");
    }

    async forget(email: string): Promise<object> {
        const user = await this.repo.findByEmail(email);

        return user;
    }

    async reset(token: string, password: string): Promise<string> {
        const { sub } = this.checkTokenUser(token);

        const user = await this.repo.resetPassword(sub.toString(), password);

        return this.createToken(user, "30min");
    }

    async me(token: string) {
        return this.checkTokenUser(token);
    }

    async register(id: string): Promise<string> {
        const entity = await this.repo.findById(id);
        const model = await this.repo.findByEmail(entity.get('email'));
        return this.createToken(model, "7days");
    }
}
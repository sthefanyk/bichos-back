import * as dotenv from 'dotenv';
dotenv.config();

import { IAuth } from './auth.interface';
import { IUserRepository } from 'src/@core/domain/contracts/user-repository.interface';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/@core/domain/models';
import { NotFoundError } from 'src/@core/shared/domain/errors/not-found.error';
import { SingInError } from 'src/@core/shared/domain/errors/singin.error';
import User from 'src/@core/domain/entities/users/user';
import { UpdateError } from 'src/@core/shared/domain/errors/update.error';

export class AuthService implements IAuth {
  constructor(private repo: IUserRepository) {}

  createToken(user: User, time: string) {
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: time,
        subject: user.id,
        issuer: 'API Bichos',
        audience: 'users',
      },
    );

    return { accessToken: token };
  }

  checkTokenUser(token: string) {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET, {
        audience: 'users',
        issuer: 'API Bichos',
      });

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifyPassword(password: string, passwordCrypt: string) {
    return await bcrypt.compare(password, passwordCrypt);
  }

  isValidToken(token: string) {
    try {
      this.checkTokenUser(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async singIn( email: string, password: string ): Promise<{ accessToken: string }> {
    const user = await this.repo.findUserByEmail(email);

    if (!user || !(await this.verifyPassword(password, user.password))) {
      throw new SingInError();
    }

    return this.createToken(user, '7d');
  }

  async forget(email: string): Promise<UserModel> {
    const user = await this.repo.findUserByEmail(email);

    return user as any;
  }

  async reset( token: string, password: string ): Promise<{ accessToken: string }> {
    const { sub } = this.checkTokenUser(token);

    const user = await this.repo.findUserById(sub.toString());
    if (!user) throw new NotFoundError('User not found');

    await user.resetPassword(password);
    
    const result = await this.repo.resetPassword(user);
    if (!result) throw new UpdateError(`Could not update user`);

    return this.createToken(user, '30min');
  }

  async me(token: string) {
    return this.checkTokenUser(token);
  }

  async register(user: User): Promise<{ accessToken: string }> {
    return this.createToken(user, '7days');
  }

  async findUserById(id: string) {
    const user = await this.repo.findUserById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }
}

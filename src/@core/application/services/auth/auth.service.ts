import * as dotenv from 'dotenv';
dotenv.config();

import { IAuth } from './auth.interface';
import { IUserRepository } from 'src/@core/domain/contracts/user-repository.interface';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import UserModel from 'src/@core/domain/models/user.model';
import PasswordValidate from './password-validate';
import { NotFoundError } from 'src/@core/shared/domain/errors/not-found.error';
import { SingInError } from 'src/@core/shared/domain/errors/singin.error';

export class AuthService implements IAuth {
  constructor(private repo: IUserRepository) {}

  createToken(user: UserModel, time: string) {
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

  async generatePasswordHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
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
    const user = await this.repo.findByEmail(email);

    return user as any;
  }

  async reset( token: string, password: string ): Promise<{ accessToken: string }> {
    const { sub } = this.checkTokenUser(token);

    const passwordValidated = new PasswordValidate(password);
    const passwordValidatedAndCrypt = await this.generatePasswordHash(passwordValidated.password);
    const user = await this.repo.resetPassword(sub.toString(), passwordValidatedAndCrypt);

    return this.createToken(user, '30min');
  }

  async me(token: string) {
    return this.checkTokenUser(token);
  }

  async register(model: UserModel): Promise<{ accessToken: string }> {
    return this.createToken(model, '7days');
  }

  async findUserById(id: string): Promise<UserModel> {
    const user = await this.repo.findUserById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }
}

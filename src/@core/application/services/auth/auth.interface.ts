import User from 'src/@core/domain/entities/users/user';

export interface IAuth {
  singIn(email: string, password: string): Promise<{ accessToken: string }>;
  forget(email: string): Promise<object>;
  reset(token: string, password: string): Promise<{ accessToken: string }>;
  findUserById(id: string): Promise<User>;
}

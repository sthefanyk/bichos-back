import { UserSearch } from '../../application/use-cases/user/search.usecase';
import {
  UserFindById,
  UserFindByEmail,
  UserFindByUsername,
} from '../../application/use-cases/user';
import User from '../entities/users/user';

export interface IUserRepository {
  findUserById(id: string): UserFindById.Output;
  findUserByEmail(email: string): UserFindByEmail.Output;
  findUserByUsername(username: string): UserFindByUsername.Output;
  findAllUser(): UserSearch.Output;
  resetPassword(user: User): Promise<User>;
}
